"use client";
import React, { useEffect, useState } from "react";

const resources = [
  { name: "Singers", api: "/api/singers", fields: ["name", "image", "role", "bio"] },
  { name: "Options", api: "/api/options", fields: ["name", "description", "image"] },
  { name: "Concepts", api: "/api/concepts", fields: ["name", "description", "image"] },
  { name: "Videos", api: "/api/videos", fields: ["title", "url"], isMedia: true, mediaType: "video" },
  { name: "Pictures", api: "/api/pictures", fields: ["url"], isMedia: true, mediaType: "image", allowUpload: true },
];

function ResourceAdmin({ name, api, fields, isMedia, mediaType, allowUpload }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch(api);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`${api}?id=${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
    setShowForm(true);
  };

  const handleAdd = () => {
    setFormData({});
    setEditId(null);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${api}?id=${editId}` : api;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setShowForm(false);
    setFormData({});
    setEditId(null);
    setUploading(false);
    fetchItems();
  };

  // For image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const urls = await res.json();
    // Add each uploaded image to the pictures collection
    await Promise.all(urls.map(url => fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })));
    setUploading(false);
    fetchItems();
  };

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, margin: 24, padding: 24, position: "relative", backgroundColor: "#fff" }}>
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>{name}</h2>
      <div style={{ position: "absolute", top: 24, right: 24, display: "flex", gap: 8 }}>
        {allowUpload && (
          <label style={{ background: "#0070f3", color: "#fff", borderRadius: 4, padding: "6px 16px", cursor: "pointer" }}>
            {uploading ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span className="spinner" style={{ width: 18, height: 18, border: "2px solid #fff", borderTop: "2px solid #0070f3", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }}></span>
                Uploading...
              </span>
            ) : (
              <>Upload Images</>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        )}
        {!allowUpload && (
          <button
            style={{ padding: "6px 16px", borderRadius: 4, background: "#0070f3", color: "#fff", border: "none", cursor: "pointer" }}
            onClick={handleAdd}
          >
            + Add {name.slice(0, -1)}
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : isMedia ? (
        <div style={{ display: "flex", overflowX: "auto", gap: 16, padding: 8, background: "#fafafa", borderRadius: 8, minHeight: 160 }}>
          {items.map((item) => (
            <div key={item._id} style={{ position: "relative", minWidth: 200, maxWidth: 240, height: 150, display: "flex", alignItems: "center", justifyContent: "center", background: "#eee", borderRadius: 8, overflow: "hidden" }}>
              <button
                onClick={() => handleDelete(item._id)}
                style={{ position: "absolute", bottom: 8, right: 8, zIndex: 2, background: "rgba(255,255,255,0.8)", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontWeight: "bold", color: "#d00" }}
                title="Delete"
              >
                ×
              </button>
              {mediaType === "image" ? (
                <img src={item.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4, marginTop:15, textAlign: "center", color: "#333", background: "rgba(255,255,255,0.7)", borderRadius: 4, padding: "2px 4px" }}>{item.title}</div>
                  <iframe
                    src={item.url}
                    title={item.title || "Video"}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
          <thead>
            <tr>
              {fields.map((f) => (
                <th key={f} style={{ borderBottom: "1px solid #eee", textAlign: "left", padding: 8 }}>{f}</th>
              ))}
              <th style={{ borderBottom: "1px solid #eee", padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                {fields.map((f) => (
                  <td key={f} style={{ borderBottom: "1px solid #f5f5f5", padding: 8 }}>
                    {typeof item[f] === "object" && item[f] !== null
                      ? item[f].en || Object.values(item[f])[0]
                      : item[f]}
                  </td>
                ))}
                <td style={{ borderBottom: "1px solid #f5f5f5", padding: 8 }}>
                  <button onClick={() => handleEdit(item)} style={{ marginRight: 8 }}>Edit</button>
                  <button onClick={() => handleDelete(item._id)} style={{ color: "red" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showForm && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 8, minWidth: 320, boxShadow: "0 2px 16px rgba(0,0,0,0.15)" }}>
            <h3 style={{ marginBottom: 16 }}>{editId ? `Edit ${name.slice(0, -1)}` : `Add ${name.slice(0, -1)}`}</h3>
            {uploading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span className="spinner" style={{ width: 18, height: 18, border: "2px solid #0070f3", borderTop: "2px solid #fff", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }}></span>
                <span>Saving...</span>
              </div>
            )}
            {fields.map((f) => (
              <div key={f} style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>{f}</label>
                <input
                  name={f}
                  value={formData[f] || ""}
                  onChange={handleChange}
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                  required
                  disabled={uploading}
                />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "6px 16px" }} disabled={uploading}>Cancel</button>
              <button type="submit" style={{ padding: "6px 16px", background: "#0070f3", color: "#fff", border: "none", borderRadius: 4 }} disabled={uploading}>{editId ? "Update" : "Create"}</button>
            </div>
          </form>
        </div>
      )}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
      <h1 style={{ fontSize: 32, marginBottom: 32 , color: "#fff"}}>Admin Dashboard</h1>
      {resources.map((r) => (
        <ResourceAdmin key={r.name} {...r} />
      ))}
    </div>
  );
} 