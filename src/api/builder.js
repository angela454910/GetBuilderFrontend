import { get, put, post } from "./axios";
import queryString from "query-string";

const API_BUILDER_URL = "/builders";

export const fetchBuilders = () => {
  const url = `${API_BUILDER_URL}`;
  return get(url).then((res) => ({
    builders: res.data.data.map((builder) => ({
      ...builder,
      description:
        "Lorem ipsum dolor sit amet. Proin elementum pulvinar tortor ut vehicula. Cras iaculis arcu sit amet turpis scelerisque, a commodo ipsum luctus. Pellentesque nisl ex, pretium tempus posuere rhoncus, consequat eu ex. Integer sollicitudin lacus ante, commodo mollis. Donec pharetra scelerisque mauris ac tempus. ",
    })),
  }));
};

export const createBuilder = (builder) => {
  return post(API_BUILDER_URL, builder).then((res) => res.data.data);
};

export const getBuilder = (builderId) => {
  const url = `${API_BUILDER_URL}/${builderId}`;
  return get(url).then((res) => res.data);
};

export const updateBuilder = (builderId, builder) => {
  const url = `${API_BUILDER_URL}/${builderId}`;
  return put(url, builder).then((res) => res.data.data);
};

export const getBuilderOrders = (builderId, page = 1, pageSize = 6, status) => {
  const stringified = queryString.stringify({
    page,
    pageSize,
    status,
  });
  const url = `${API_BUILDER_URL}/${builderId}/orders/?${stringified}`;

  return get(url).then((res) => ({
    orders: res.data.data,
    pagination: res.data.pagination,
    status: res.data.search,
  }));
};

export const updateAvatar = (builderId, file) => {
  const url = `${API_BUILDER_URL}/${builderId}/avatar`;
  return put(url, file);
};
