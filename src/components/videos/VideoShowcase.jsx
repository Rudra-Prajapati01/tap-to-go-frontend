import React, { useState, useEffect } from "react";

const VideoShowcase = () => {
  const [url, setUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [saving, setSaving] = useState(false);

  // Existing useEffect to load data
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.youtubeVideos) {
        setVideos(user.youtubeVideos);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&]+)/,
      /(?:youtu\.be\/)([^?&]+)/,
      /(?:youtube\.com\/embed\/)([^?&]+)/,
      /(?:youtube\.com\/live\/)([^?&]+)/,
      /(?:youtube\.com\/shorts\/)([^?&]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  const handleAddVideo = () => {
    if (!url.trim()) return;
    const videoId = getVideoId(url);
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const newVideo = { title: "", url, videoId, thumbnail, featured: false };
    setVideos([...videos, newVideo]);
    setUrl("");
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  // New Save Function
  const handleSaveVideos = async () => {
    try {
      setSaving(true);
      const user = JSON.parse(localStorage.getItem("user"));
      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/update-profile/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ youtubeVideos: videos }),
        }
      );

      const updatedUser = await response.json();

      localStorage.setItem("user", JSON.stringify({
        ...user,
        youtubeVideos: videos,
      }));

      alert("Videos saved successfully!");
      console.log(updatedUser);
    } catch (error) {
      console.error(error);
      alert("Failed to save videos");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "10px" }}>
        🎥 Video Showcase
      </h1>
      <p style={{ color: "#64748b", marginBottom: "30px" }}>
        Add YouTube videos to display on your public profile.
      </p>

      <div style={{ background: "#fff", borderRadius: "20px", padding: "24px", border: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input
            type="text"
            placeholder="Paste YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ flex: 1, height: "50px", borderRadius: "12px", border: "1px solid #dbe2ea", padding: "0 16px" }}
          />
          <button onClick={handleAddVideo} style={{ padding: "0 24px", border: "none", borderRadius: "12px", background: "#0B4DBB", color: "#fff", fontWeight: "600", cursor: "pointer" }}>
            Add Video
          </button>
        </div>

        {/* Video List mapping */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "20px" }}>
          {videos.map((video, index) => (
            <div key={index} style={{ border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", background: "#fff" }}>
              <img src={video.thumbnail} alt="thumbnail" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
              <div style={{ padding: "16px" }}>
                <p style={{ fontSize: "13px", color: "#64748b", wordBreak: "break-all" }}>{video.url}</p>
                <button onClick={() => removeVideo(index)} style={{ marginTop: "12px", width: "100%", height: "42px", border: "none", borderRadius: "10px", background: "#ef4444", color: "#fff", cursor: "pointer", fontWeight: "600" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Updated Save Button */}
        {videos.length > 0 && (
          <button
            onClick={handleSaveVideos}
            disabled={saving}
            style={{
              marginTop: "24px",
              width: "100%",
              height: "52px",
              border: "none",
              borderRadius: "14px",
              background: saving ? "#94a3b8" : "#16a34a",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving..." : "Save Videos"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoShowcase;