// src/services/clientes.js

const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "";

/**
 * Função interna para requisições
 */
async function request(path, options = {}) {
  const url = `${base}/${path.replace(/^\/+/, "")}`;

  const res = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} - ${text || res.statusText}`);
  }

  return res.status !== 204 ? res.json() : null;
}

/**
 * CRUD de clientes
 */
export function listarClientes() {
  return request("clientes", { method: "GET" });
}

export function buscarCliente(id) {
  return request(`clientes/${id}`, { method: "GET" });
}

export function criarCliente(data) {
  return request("clientes", { method: "POST", body: JSON.stringify(data) });
}

export function atualizarCliente(id, data) {
  return request(`clientes/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export function deletarCliente(id) {
  return request(`clientes/${id}`, { method: "DELETE" });
}
