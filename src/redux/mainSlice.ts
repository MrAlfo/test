import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.hophop.com.tr/activity/graphql',
  cache: new InMemoryCache(),
});

// Async thunk
export const dashboardComponents = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const { data } = await client.query({
      query: gql`
        query Settings {
          settings {
            dashboardComponents {
              _id
              name
              categories {
                _id
                description
                imageUrl
              }
            }
          }
        }
      `,
    });
    return data.settings.dashboardComponents;
  }
);

export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async ({ filter, pagination }: { filter: any; pagination: any }) => {
    const { data } = await client.query({
      query: gql`
        query Anonymous_activities($filter: FilterActivitiesByAnonymousInput, $pagination: Pagination) {
          anonymous_activities(filter: $filter, pagination: $pagination) {
            count
            data {
              _id
              title
              price
              schedule {
                startDate
                endDate
              }
              duration
              listing {
                ageInterval
                rating {
                  average
                  numberOfReviews
                }
                exteriorOrganizer {
                  name
                }
                format
              }
              createdBy {
                displayName
              }
              fee
              location {
                city
                district
              }
            }
          }
        }
      `,
      variables: {
        filter,
        pagination,
      },
    });
    return data.anonymous_activities;
  }
);

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    activities: {
      data: [] as Array<any>,
      count: 0,
    },
    users: [] as Array<any>,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardComponents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardComponents.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(dashboardComponents.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default userSlice.reducer;
