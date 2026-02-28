// src/providers/data-provider.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dataProvider = {
  getList: async ({ resource }) => {
    const res = await fetch(`${API_URL}/seller/${resource}`, {
      credentials: "include",
    });

    const data = await res.json();

    return {
      data: data.items,
      total: data.total,
    };
  },

  getOne: async ({ resource, id }) => {
    const res = await fetch(`${API_URL}/seller/${resource}/${id}`, {
      credentials: "include",
    });

    return { data: await res.json() };
  },

  create: async ({ resource, variables }) => {
    const res = await fetch(`${API_URL}/seller/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(variables),
    });

    return { data: await res.json() };
  },

  update: async ({ resource, id, variables }) => {
    const res = await fetch(`${API_URL}/seller/${resource}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(variables),
    });

    return { data: await res.json() };
  },

  deleteOne: async ({ resource, id }) => {
    await fetch(`${API_URL}/seller/${resource}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    return { data: { id } };
  },
};
