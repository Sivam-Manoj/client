import apiSlice from "../apiSlice";

const API_ENDPOINTS: string = "/car";

const carApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCarApi: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS}`,
        method: "POST",
        body: data,
      }),
    }),
    getCarsApi: builder.query({
      query: () => ({
        url: `${API_ENDPOINTS}`,
        method: "GET",
      }),
    }),
    updateCarApi: builder.mutation({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCarApi: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useCreateCarApiMutation,
  useGetCarsApiQuery,
  useDeleteCarApiMutation,
  useUpdateCarApiMutation,
} = carApiSlice;
export default carApiSlice.reducer;
