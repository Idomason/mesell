import type { DataProvider } from "@refinedev/core";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const dataProvider: DataProvider = {
  getApiUrl: () => API_URL,

  getList: async ({ resource }) => {
    const res = await fetch(`${API_URL}/${resource}`);
    const data = await res.json();

    return {
      data,
      total: data.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const res = await fetch(`${API_URL}/${resource}/${id}`);
    const data = await res.json();

    return { data };
  },

  create: async ({ resource, variables }) => {
    const res = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });

    const data = await res.json();

    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const res = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });

    const data = await res.json();

    return { data };
  },

  deleteOne: async ({ resource, id }) => {
    const res = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    return {
      data,
    };
  },
};
