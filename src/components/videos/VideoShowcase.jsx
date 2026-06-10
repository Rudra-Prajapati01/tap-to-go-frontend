import React, { useState, useEffect } from "react";

const VideoShowcase = () => {
  const [url, setUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.youtubeVideos) setVideos(user.youtubeVideos);
    } catch (e) { console.log(e); }
  }, []);

  const getVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&]+)/,
      /(?:youtu\.be\/)([^?&]+)/,
      /(?:youtube\.com\/embed\/)([^?&]+)/,
      /(?:youtube\.com\/live\/)([^?&]+)/,
      /(?:youtube\.com\/shorts\/)([^?&]+)/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m?.[1]) return m[1];
    }
    return null;
  };

  const handleSaveVideos = async (updatedVideos) => {
    try {
      setSaving(true);
      const user = JSON.parse(localStorage.getItem("user"));
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/update-profile/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeVideos: updatedVideos }),
      });
      localStorage.setItem("user", JSON.stringify({ ...user, youtubeVideos: updatedVideos }));
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleAddAndSave = async () => {
    setError("");
    if (!url.trim()) return;
    const videoId = getVideoId(url);
    if (!videoId) {
      setError("Invalid YouTube URL. Please paste a valid link.");
      return;
    }
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const newVideo = { url, videoId, thumbnail };
    const updated = [...videos, newVideo];
    setVideos(updated);
    setUrl("");
    await handleSaveVideos(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddAndSave();
  };

  const removeVideo = async (index) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
    await handleSaveVideos(updated);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .vs * { box-sizing: border-box; font-family: 'Inter', sans-serif; }

        .vs {
          background: #F8FAFC;
          min-height: 100vh;
          padding: 40px 32px;
        }

        .vs-header { margin-bottom: 32px; }

        .vs-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #4F46E5;
          background: #EEF2FF; padding: 5px 12px; border-radius: 20px;
          margin-bottom: 14px;
        }
        .vs-title {
          font-size: 26px; font-weight: 800; color: #0F172A;
          margin: 0 0 6px; letter-spacing: -0.5px;
        }
        .vs-subtitle { font-size: 14px; color: #64748B; margin: 0; }

        .vs-card {
          background: #fff; border-radius: 20px;
          border: 1px solid #E2E8F0; padding: 28px;
          box-shadow: 0 1px 3px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.04);
        }

        /* Input bar */
        .vs-input-bar {
          display: flex; gap: 10px; align-items: center;
        }
        .vs-input-wrap { flex: 1; position: relative; }
        .vs-input-icon {
          position: absolute; left: 16px; top: 50%;
          transform: translateY(-50%); color: #94A3B8;
          display: flex; align-items: center; pointer-events: none;
        }
        .vs-input {
          width: 100%; height: 48px; border-radius: 12px;
          border: 1.5px solid #E2E8F0; padding: 0 16px 0 44px;
          font-size: 14px; color: #0F172A; background: #F8FAFC;
          outline: none; font-family: 'Inter', sans-serif;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }
        .vs-input:focus {
          border-color: #4F46E5; background: #fff;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
        }
        .vs-input::placeholder { color: #94A3B8; }
        .vs-input.error {
          border-color: #EF4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
        }

        .vs-btn-save {
          height: 48px; padding: 0 22px;
          border: none; border-radius: 12px;
          background: linear-gradient(135deg, #059669, #10B981);
          color: #fff; font-size: 14px; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 2px 8px rgba(5,150,105,0.3);
          transition: transform 0.1s, box-shadow 0.15s;
          font-family: 'Inter', sans-serif;
        }
        .vs-btn-save:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(5,150,105,0.38);
        }
        .vs-btn-save:disabled {
          background: linear-gradient(135deg, #94A3B8, #CBD5E1);
          cursor: not-allowed; box-shadow: none;
        }

        .vs-error {
          font-size: 12.5px; color: #EF4444;
          margin: 8px 0 0 4px;
          display: flex; align-items: center; gap: 5px;
        }

        /* Divider + count */
        .vs-divider { height: 1px; background: #F1F5F9; margin: 24px 0; }
        .vs-count-row {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 18px;
        }
        .vs-count-label { font-size: 13px; font-weight: 600; color: #475569; }
        .vs-count-badge {
          font-size: 11px; font-weight: 700;
          background: #F1F5F9; color: #475569;
          padding: 3px 10px; border-radius: 20px;
        }

        /* Grid */
        .vs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
        }

        .vs-video-card {
          border-radius: 14px; overflow: hidden;
          border: 1px solid #E2E8F0; background: #fff;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .vs-video-card:hover {
          box-shadow: 0 8px 30px rgba(15,23,42,0.1);
          transform: translateY(-3px);
        }

        .vs-thumb-wrap {
          position: relative; overflow: hidden;
          aspect-ratio: 16/9; cursor: pointer;
        }
        .vs-thumb {
          width: 100%; height: 100%; object-fit: cover;
          display: block; transition: transform 0.3s;
        }
        .vs-video-card:hover .vs-thumb { transform: scale(1.04); }

        .vs-overlay {
          position: absolute; inset: 0;
          background: rgba(15,23,42,0.45);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s;
        }
        .vs-video-card:hover .vs-overlay { opacity: 1; }

        .vs-play-circle {
          width: 52px; height: 52px;
          background: rgba(255,255,255,0.95);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          transition: transform 0.15s;
        }
        .vs-video-card:hover .vs-play-circle { transform: scale(1.1); }

        .vs-card-body { padding: 12px 14px 14px; }
        .vs-video-url {
          font-size: 12px; color: #94A3B8;
          overflow: hidden; text-overflow: ellipsis;
          white-space: nowrap; margin-bottom: 10px;
        }
        .vs-btn-remove {
          width: 100%; height: 36px; border: 1.5px solid #FEE2E2;
          border-radius: 9px; background: #FFF5F5;
          color: #EF4444; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: background 0.15s, border-color 0.15s;
        }
        .vs-btn-remove:hover { background: #FEE2E2; border-color: #FCA5A5; }

        /* Empty */
        .vs-empty {
          text-align: center; padding: 48px 24px; color: #94A3B8;
        }
        .vs-empty-icon { font-size: 40px; margin-bottom: 12px; opacity: 0.5; }
        .vs-empty-title { font-size: 15px; font-weight: 600; color: #64748B; margin-bottom: 6px; }
        .vs-empty-text { font-size: 13px; color: #94A3B8; }

        /* Spinner */
        .vs-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Modal */
        .vs-backdrop {
          position: fixed; inset: 0;
          background: rgba(10,15,30,0.82);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: fadeIn 0.18s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .vs-modal {
          width: 100%; max-width: 860px;
          background: #0F172A; border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.55);
          animation: slideUp 0.2s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .vs-modal-head {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .vs-modal-url {
          font-size: 12.5px; font-weight: 500; color: #94A3B8;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          max-width: calc(100% - 44px);
        }
        .vs-modal-close {
          width: 30px; height: 30px; flex-shrink: 0;
          border: none; border-radius: 7px;
          background: rgba(255,255,255,0.08); color: #94A3B8;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
          font-family: 'Inter', sans-serif;
        }
        .vs-modal-close:hover { background: rgba(255,255,255,0.15); color: #fff; }

        .vs-embed {
          position: relative; width: 100%; padding-bottom: 56.25%; background: #000;
        }
        .vs-embed iframe {
          position: absolute; inset: 0; width: 100%; height: 100%; border: none;
        }

        @media (max-width: 600px) {
          .vs { padding: 24px 16px; }
          .vs-input-bar { flex-wrap: wrap; }
          .vs-input-wrap { flex: 1 1 100%; }
          .vs-btn-save { width: 100%; justify-content: center; }
          .vs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="vs">
        {/* Modal */}
        {playingVideo && (
          <div className="vs-backdrop" onClick={() => setPlayingVideo(null)}>
            <div className="vs-modal" onClick={e => e.stopPropagation()}>
              <div className="vs-modal-head">
                <span className="vs-modal-url">{playingVideo.url}</span>
                <button className="vs-modal-close" onClick={() => setPlayingVideo(null)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className="vs-embed">
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo.videoId}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen title="YouTube video"
                />
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="vs-header">
          <div className="vs-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            Content Management
          </div>
          <h1 className="vs-title">Video Showcase</h1>
          <p className="vs-subtitle">Paste a YouTube link and hit Save — it appears instantly on your profile.</p>
        </div>

        {/* Card */}
        <div className="vs-card">

          {/* Input bar */}
          <div className="vs-input-bar">
            <div className="vs-input-wrap">
              <span className="vs-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </span>
              <input
                className={`vs-input${error ? " error" : ""}`}
                type="text"
                placeholder="Paste YouTube URL and press Save…"
                value={url}
                onChange={e => { setUrl(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className="vs-btn-save" onClick={handleAddAndSave} disabled={saving}>
              {saving ? (
                <><span className="vs-spinner" /> Saving…</>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="vs-error">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {error}
            </p>
          )}

          {/* Divider + count */}
          {videos.length > 0 && (
            <>
              <div className="vs-divider" />
              <div className="vs-count-row">
                <span className="vs-count-label">Your Videos</span>
                <span className="vs-count-badge">{videos.length} {videos.length === 1 ? "video" : "videos"}</span>
              </div>
            </>
          )}

          {/* Grid */}
          {videos.length === 0 ? (
            <div className="vs-empty">
              <div className="vs-empty-icon">🎬</div>
              <div className="vs-empty-title">No videos yet</div>
              <div className="vs-empty-text">Paste a YouTube URL above and hit Save to get started.</div>
            </div>
          ) : (
            <div className="vs-grid">
              {videos.map((video, index) => (
                <div key={index} className="vs-video-card">
                  <div className="vs-thumb-wrap" onClick={() => setPlayingVideo(video)}>
                    <img src={video.thumbnail} alt="thumbnail" className="vs-thumb" />
                    <div className="vs-overlay">
                      <div className="vs-play-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#4F46E5">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="vs-card-body">
                    <p className="vs-video-url" title={video.url}>{video.url}</p>
                    <button className="vs-btn-remove" onClick={() => removeVideo(index)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default VideoShowcase;
