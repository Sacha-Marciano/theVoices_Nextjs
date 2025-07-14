"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

// Login component
function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("adminAuthenticated", "true");
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ 
          textAlign: "center", 
          marginBottom: "32px", 
          color: "#333",
          fontSize: "28px",
          fontWeight: "600"
        }}>
          Admin Login
        </h1>
        
        {error && (
          <div style={{
            background: "#fee",
            color: "#c33",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              color: "#555",
              fontWeight: "500"
            }}>
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              color: "#555",
              fontWeight: "500"
            }}>
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseOver={(e) => e.target.style.background = "#0056b3"}
            onMouseOut={(e) => e.target.style.background = "#0070f3"}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Logout button component
function LogoutButton({ onLogout }) {
  return (
    <button
      onClick={onLogout}
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        padding: "8px 16px",
        background: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
      }}
    >
      Logout
    </button>
  );
}

const resources = [
  { name: "Singers", api: "/api/singers", fields: ["name", "image", "role"] },
  { name: "Options", api: "/api/options", fields: ["name", "description", "image"], multilingual: true },
  { name: "Concepts", api: "/api/concepts", fields: ["name", "image", "info"], multilingual: true, hasInfoArray: true },
  { name: "Videos", api: "/api/videos", fields: ["title", "url"], isMedia: true, mediaType: "video" },
  { name: "Pictures", api: "/api/pictures", fields: ["url"], isMedia: true, mediaType: "image", allowUpload: true },
];

function ResourceAdmin({ name, api, fields, isMedia, mediaType, allowUpload, multilingual, hasInfoArray }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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
    
    try {
      const response = await fetch(`${api}?id=${id}`, { method: "DELETE" });
      
      if (!response.ok) {
        const errorText = await response.text();
        alert(`Delete failed: ${response.status} - ${errorText}`);
        return;
      }
      
      fetchItems();
    } catch (error) {
      alert(`Delete failed: ${error.message}`);
    }
  };

  const handleEdit = (item) => {
    if (name === "Concepts" && Array.isArray(item.info)) {
      const normalizedInfo = item.info.map(infoItem => ({
        title: {
          en: infoItem.title?.en || "",
          fr: infoItem.title?.fr || "",
          he: infoItem.title?.he || "",
        },
        description: {
          en: Array.isArray(infoItem.description?.en) ? infoItem.description.en : (infoItem.description?.en ? [infoItem.description.en] : []),
          fr: Array.isArray(infoItem.description?.fr) ? infoItem.description.fr : (infoItem.description?.fr ? [infoItem.description.fr] : []),
          he: Array.isArray(infoItem.description?.he) ? infoItem.description.he : (infoItem.description?.he ? [infoItem.description.he] : []),
        }
      }));
      setFormData({ ...item, info: normalizedInfo });
    } else {
      setFormData(item);
    }
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

  // Helper for multilingual fields
  const handleMultiLangChange = (field, lang, value) => {
    setFormData({
      ...formData,
      [field]: {
        ...(formData[field] || {}),
        [lang]: value,
      },
    });
  };

  // Helper for info array management
  const addInfoItem = () => {
    setFormData({
      ...formData,
      info: [...(formData.info || []), { title: { en: '', fr: '', he: '' }, description: { en: [], fr: [], he: [] } }]
    });
  };

  const removeInfoItem = (index) => {
    const newInfo = [...(formData.info || [])];
    newInfo.splice(index, 1);
    setFormData({ ...formData, info: newInfo });
  };

  const updateInfoItem = (index, field, lang, value) => {
    const newInfo = [...(formData.info || [])];
    if (field === 'description') {
      // Split by newlines for description arrays
      newInfo[index][field][lang] = value.split('\n').filter(line => line.trim());
    } else {
      newInfo[index][field][lang] = value;
    }
    setFormData({ ...formData, info: newInfo });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${api}?id=${editId}` : api;

    // Normalize YouTube URL if this is a video resource
    let dataToSave = { ...formData };
    if (name === "Videos" && dataToSave.url) {
      dataToSave.url = normalizeYouTubeUrl(dataToSave.url);
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        alert(`Error: ${response.status} - ${errorText}`);
        setUploading(false);
        return;
      }
      
      setShowForm(false);
      setFormData({});
      setEditId(null);
      setUploading(false);
      fetchItems();
    } catch (error) {
      alert(`Network error: ${error.message}`);
      setUploading(false);
    }
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

  // For single image upload in forms
  const handleSingleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("files", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const urls = await res.json();
    setFormData({ ...formData, image: urls[0] });
    setUploadingImage(false);
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
          <>
            <button
              style={{ padding: "6px 16px", borderRadius: 4, background: "#0070f3", color: "#fff", border: "none", cursor: "pointer" }}
              onClick={handleAdd}
            >
              + Add {name.slice(0, -1)}
            </button>
          </>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : isMedia ? (
        <div style={{ display: "flex", overflowX: "auto", gap: 16, padding: 8, background: "#fafafa", borderRadius: 8, minHeight: 160 }}>
          {items.map((item) => (
            <div key={item._id} style={{ position: "relative", minWidth: 800, maxWidth: 960, width: '100%', height: 'auto', display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center", background: "#eee", borderRadius: 8, overflow: "hidden", marginBottom: 32 }}>
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
                  {(() => {
                    const url = normalizeYouTubeUrl(item.url);
                    // Extract video ID from normalized URL
                    const match = url.match(/[?&]v=([\w-]{11})/);
                    const videoId = match ? match[1] : null;
                    if (videoId) {
                      return (
                        <div style={{ position: 'relative', width: '100%', maxWidth: '960px', paddingBottom: '56.25%', height: 0 }}>
                          <iframe
                            width="960"
                            height="540"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={item.title || "YouTube video"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ borderRadius: 8, overflow: 'hidden', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                          />
                        </div>
                      );
                    } else {
                      return <div style={{ color: 'red', padding: 8 }}>Invalid YouTube URL</div>;
                    }
                  })()}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxHeight: 3 * 64 + 2 * 16, overflowY: 'auto', display: 'block' }}>
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
                      {f === "image" ? (
                        <img src={item[f]} alt="" style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }} />
                      ) : f === "info" ? (
                        <span>{Array.isArray(item[f]) ? `${item[f].length} items` : 'N/A'}</span>
                      ) : f === "description" && multilingual && typeof item[f] === "object" && item[f] !== null ? (
                        <span style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                          {item[f].en || Object.values(item[f])[0]}
                        </span>
                      ) : multilingual && (f === "name" || f === "description") && typeof item[f] === "object" && item[f] !== null ? (
                        item[f].en || Object.values(item[f])[0]
                      ) : typeof item[f] === "object" && item[f] !== null ? (
                        item[f].en || Object.values(item[f])[0]
                      ) : (
                        item[f]
                      )}
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
        </div>
      )}
      {showForm && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 8, minWidth: 320, maxWidth: 800, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 2px 16px rgba(0,0,0,0.15)" }}>
            <h3 style={{ marginBottom: 16 }}>{editId ? `Edit ${name.slice(0, -1)}` : `Add ${name.slice(0, -1)}`}</h3>
            {uploading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span className="spinner" style={{ width: 18, height: 18, border: "2px solid #0070f3", borderTop: "2px solid #fff", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }}></span>
                <span>Saving...</span>
              </div>
            )}
            {/* Image upload first if available */}
            {fields.includes("image") && (
              <div style={{ marginBottom: 20, padding: 16, backgroundColor: "#f8f9fa", borderRadius: 8, border: "2px dashed #dee2e6" }}>
                <h4 style={{ margin: "0 0 12px 0", color: "#495057" }}>📸 Image Upload</h4>
                <div>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 12, border: "2px solid #28a745" }} />
                  )}
                  <label style={{ display: "inline-block", background: "#28a745", color: "#fff", borderRadius: 6, padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: "bold" }}>
                    {uploadingImage ? "⏳ Uploading..." : "📁 Choose Image"}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleSingleImageUpload}
                      disabled={uploadingImage}
                    />
                  </label>
                  {!formData.image && (
                    <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#6c757d" }}>
                      Please upload an image first to continue
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Other fields */}
            {fields.filter(f => f !== "image").map((f) => (
              <div key={f} style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>{f}</label>
                {multilingual && (f === "name" || f === "description") ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    {["en", "fr", "he"].map((lang) => (
                      f === "description" ? (
                        <textarea
                          key={lang}
                          name={`${f}_${lang}`}
                          placeholder={`${f} (${lang})`}
                          value={(formData[f] && formData[f][lang]) || ""}
                          onChange={e => handleMultiLangChange(f, lang, e.target.value)}
                          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc", minHeight: 80, resize: "vertical" }}
                          required={lang === "en"}
                          disabled={uploading}
                        />
                      ) : (
                        <input
                          key={lang}
                          name={`${f}_${lang}`}
                          placeholder={`${f} (${lang})`}
                          value={(formData[f] && formData[f][lang]) || ""}
                          onChange={e => handleMultiLangChange(f, lang, e.target.value)}
                          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                          required={lang === "en"}
                          disabled={uploading}
                        />
                      )
                    ))}
                  </div>
                ) : f === "info" && hasInfoArray ? (
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <button type="button" onClick={addInfoItem} style={{ background: "#28a745", color: "#fff", padding: "4px 8px", borderRadius: 4, border: "none", cursor: "pointer" }}>
                        + Add Info Item
                      </button>
                    </div>
                    {(formData[f] || []).map((infoItem, index) => (
                      <div key={index} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <h4 style={{ margin: 0 }}>Info Item {index + 1}</h4>
                          <button type="button" onClick={() => removeInfoItem(index)} style={{ background: "#dc3545", color: "#fff", padding: "2px 6px", borderRadius: 4, border: "none", cursor: "pointer" }}>
                            Remove
                          </button>
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <label style={{ display: "block", marginBottom: 4 }}>Title</label>
                          <div style={{ display: "flex", gap: 8 }}>
                            {["en", "fr", "he"].map((lang) => (
                              <input
                                key={lang}
                                placeholder={`Title (${lang})`}
                                value={infoItem.title?.[lang] || ""}
                                onChange={e => updateInfoItem(index, "title", lang, e.target.value)}
                                style={{ flex: 1, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
                                required={lang === "en"}
                                disabled={uploading}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", marginBottom: 4 }}>Description (one per line)</label>
                          <div style={{ display: "flex", gap: 8 }}>
                            {["en", "fr", "he"].map((lang) => (
                              <textarea
                                key={lang}
                                placeholder={`Description (${lang}) - one per line`}
                                value={Array.isArray(infoItem.description?.[lang]) ? infoItem.description[lang].join('\n') : ""}
                                onChange={e => updateInfoItem(index, "description", lang, e.target.value)}
                                style={{ flex: 1, padding: 6, borderRadius: 4, border: "1px solid #ccc", minHeight: 60 }}
                                disabled={uploading}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    name={f}
                    value={formData[f] || ""}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                    required
                    disabled={uploading}
                  />
                )}
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

function normalizeYouTubeUrl(url) {
  if (!url) return url;
  // youtu.be short links
  let match = url.match(/^https?:\/\/youtu\.be\/([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  // youtube shorts
  match = url.match(/^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  // youtube embed
  match = url.match(/^https?:\/\/(?:www\.)?youtube\.com\/embed\/([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  // youtube watch (strip extra params)
  match = url.match(/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  // fallback: strip params from any youtube url
  match = url.match(/([\w-]{11})/);
  if (/youtube\.com|youtu\.be/.test(url) && match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  return url;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on component mount
    const authStatus = localStorage.getItem("adminAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <div style={{ color: "#fff", fontSize: "18px" }}>Loading...</div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Show admin dashboard if authenticated
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32, position: "relative"}}>
      <LogoutButton onLogout={handleLogout} />
      <h1 style={{ fontSize: 32, marginBottom: 32 , color: "#fff"}}>Admin Dashboard</h1>
      {resources.map((r) => (
        <ResourceAdmin key={r.name} {...r} />
      ))}
    </div>
  );
} 