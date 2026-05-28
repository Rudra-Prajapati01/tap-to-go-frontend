import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [editLead, setEditLead] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => { fetchLeads(); }, []);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads/${user._id}`);
      setLeads(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this contact?");
      if (!confirmDelete) return;
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/leads/delete/${id}`);
      console.log(res.data);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      setSelectedLead(null);
      alert("Contact deleted 🚀");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Delete failed");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/leads/update/${editLead._id}`,
        { name: editLead.name, email: editLead.email, phone: editLead.phone, company: editLead.company, message: editLead.message }
      );
      console.log(res.data);
      setLeads((prev) => prev.map((lead) => lead._id === editLead._id ? { ...lead, ...editLead } : lead));
      setEditLead(null);
      alert("Updated successfully 🚀");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Update failed");
    }
  };

  const downloadVCF = (lead) => {
    const vcf = `BEGIN:VCARD\nVERSION:3.0\nFN:${lead.name || ""}\nEMAIL:${lead.email || ""}\nTEL:${lead.phone || ""}\nORG:${lead.company || ""}\nNOTE:${lead.message || ""}\nEND:VCARD`;
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${lead.name || "contact"}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const q = search.toLowerCase();
      return (
        lead.name?.toLowerCase().includes(q) ||
        lead.email?.toLowerCase().includes(q) ||
        lead.company?.toLowerCase().includes(q)
      );
    });
  }, [leads, search]);

  const initials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const avatarColor = (name = "") => {
    const colors = [
      ["#6d28d9","#ede9fe"], ["#0369a1","#e0f2fe"], ["#065f46","#d1fae5"],
      ["#92400e","#fef3c7"], ["#831843","#fce7f3"], ["#1e3a5f","#dbeafe"],
    ];
    const idx = name.charCodeAt(0) % colors.length;
    return colors[idx];
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  /* ─────────────── STYLES ─────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .jtc-root {
      font-family: 'DM Sans', sans-serif;
      background: #f5f3ff;
      min-height: 100vh;
      padding: 32px 28px 60px;
      color: #111827;
    }

    /* ── TOP BAR ── */
    .jtc-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }

    .jtc-title-wrap { display: flex; align-items: center; gap: 14px; }

    .jtc-icon-badge {
      width: 48px; height: 48px;
      border-radius: 14px;
      background: linear-gradient(135deg, #7c3aed, #9333ea);
      display: flex; align-items: center; justify-content: center;
      font-size: 22px;
      box-shadow: 0 8px 24px rgba(124,58,237,0.35);
      flex-shrink: 0;
    }

    .jtc-title {
      font-family: 'Sora', sans-serif;
      font-size: 26px;
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.5px;
    }

    .jtc-subtitle {
      font-size: 13px;
      color: #9ca3af;
      font-weight: 500;
      margin-top: 2px;
    }

    .jtc-topbar-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }

    .jtc-count-badge {
      background: #ede9fe;
      color: #6d28d9;
      font-size: 13px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 20px;
      white-space: nowrap;
    }

    .jtc-search-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .jtc-search-icon {
      position: absolute;
      left: 14px;
      color: #9ca3af;
      font-size: 16px;
      pointer-events: none;
    }

    .jtc-search {
      height: 44px;
      width: 280px;
      border-radius: 12px;
      border: 1.5px solid #e5e7eb;
      padding: 0 16px 0 40px;
      outline: none;
      background: #fff;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      color: #374151;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .jtc-search:focus {
      border-color: #7c3aed;
      box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
    }

    .jtc-search::placeholder { color: #9ca3af; }

    /* ── TABLE CARD ── */
    .jtc-card {
      background: #fff;
      border-radius: 20px;
      border: 1px solid #ede9fe;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.04);
    }

    .jtc-thead {
      display: grid;
      grid-template-columns: 2.4fr 1.1fr 0.9fr 60px 56px;
      gap: 8px;
      padding: 14px 24px;
      background: #faf7ff;
      border-bottom: 1px solid #ede9fe;
    }

    .jtc-th {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #9ca3af;
    }

    .jtc-row {
      display: grid;
      grid-template-columns: 2.4fr 1.1fr 0.9fr 60px 56px;
      gap: 8px;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #f5f3ff;
      transition: background 0.15s;
      position: relative;
      cursor: default;
    }

    .jtc-row:last-child { border-bottom: none; }
    .jtc-row:hover { background: #faf7ff; }

    .jtc-contact-cell { display: flex; align-items: center; gap: 14px; min-width: 0; }

    .jtc-avatar {
      width: 44px; height: 44px;
      border-radius: 13px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Sora', sans-serif;
      font-size: 14px;
      font-weight: 800;
      flex-shrink: 0;
      letter-spacing: 0.5px;
    }

    .jtc-lead-name {
      font-family: 'Sora', sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #111827;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .jtc-lead-email {
      font-size: 12px;
      color: #9ca3af;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .jtc-company-cell {
      font-size: 13px;
      font-weight: 600;
      color: #374151;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .jtc-date-cell {
      font-size: 12px;
      color: #9ca3af;
      font-weight: 500;
    }

    .jtc-icon-btn {
      width: 36px; height: 36px;
      border: none;
      border-radius: 10px;
      background: #f5f3ff;
      color: #7c3aed;
      font-size: 16px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, transform 0.1s;
      flex-shrink: 0;
    }

    .jtc-icon-btn:hover { background: #ede9fe; transform: scale(1.07); }
    .jtc-icon-btn:active { transform: scale(0.95); }

    /* ── DROPDOWN MENU ── */
    .jtc-menu-wrap { position: relative; display: flex; justify-content: flex-end; }

    .jtc-menu {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      min-width: 200px;
      background: #fff;
      border-radius: 16px;
      border: 1px solid #ede9fe;
      overflow: hidden;
      z-index: 999;
      box-shadow: 0 16px 48px rgba(124,58,237,0.14), 0 4px 12px rgba(0,0,0,0.06);
      animation: jtcDropIn 0.15s ease;
    }

    @keyframes jtcDropIn {
      from { opacity: 0; transform: translateY(-6px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .jtc-menu-item {
      width: 100%;
      border: none;
      background: transparent;
      padding: 13px 18px;
      text-align: left;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid #f5f3ff;
      transition: background 0.12s;
    }

    .jtc-menu-item:last-child { border-bottom: none; }
    .jtc-menu-item:hover { background: #faf7ff; }
    .jtc-menu-item.danger { color: #ef4444; }
    .jtc-menu-item.danger:hover { background: #fef2f2; }

    /* ── EMPTY STATE ── */
    .jtc-empty {
      padding: 72px 24px;
      text-align: center;
    }

    .jtc-empty-icon {
      font-size: 52px;
      margin-bottom: 16px;
      display: block;
    }

    .jtc-empty-title {
      font-family: 'Sora', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 8px;
    }

    .jtc-empty-desc { font-size: 14px; color: #9ca3af; }

    /* ── SKELETON ── */
    .jtc-skeleton-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 24px;
      border-bottom: 1px solid #f5f3ff;
      animation: jtcPulse 1.5s ease-in-out infinite;
    }

    @keyframes jtcPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    .jtc-skel { background: #f1f0f5; border-radius: 8px; }

    /* ── MODAL ── */
    .jtc-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 10, 30, 0.55);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
      animation: jtcFadeIn 0.2s ease;
    }

    @keyframes jtcFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .jtc-modal-box {
      width: 100%;
      max-width: 980px;
      background: #fff;
      border-radius: 28px;
      padding: 36px;
      position: relative;
      max-height: 92vh;
      overflow-y: auto;
      box-shadow: 0 32px 80px rgba(15,10,30,0.22);
      animation: jtcSlideUp 0.22s ease;
    }

    .jtc-modal-box.small { max-width: 600px; }

    @keyframes jtcSlideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .jtc-modal-close {
      position: absolute;
      top: 20px; right: 20px;
      width: 36px; height: 36px;
      border: none;
      border-radius: 10px;
      background: #f5f3ff;
      color: #6d28d9;
      font-size: 20px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }

    .jtc-modal-close:hover { background: #ede9fe; }

    /* View modal layout */
    .jtc-view-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }

    .jtc-view-user { display: flex; gap: 18px; align-items: center; }

    .jtc-big-avatar {
      width: 72px; height: 72px;
      border-radius: 20px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Sora', sans-serif;
      font-size: 26px;
      font-weight: 800;
      flex-shrink: 0;
    }

    .jtc-view-name {
      font-family: 'Sora', sans-serif;
      font-size: 22px;
      font-weight: 800;
      color: #111827;
    }

    .jtc-view-email { font-size: 14px; color: #9ca3af; margin-top: 4px; }

    .jtc-view-card-btn {
      height: 44px;
      padding: 0 24px;
      border: none;
      border-radius: 12px;
      background: linear-gradient(135deg, #7c3aed, #9333ea);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(124,58,237,0.3);
      transition: box-shadow 0.2s, transform 0.1s;
      white-space: nowrap;
    }

    .jtc-view-card-btn:hover { box-shadow: 0 8px 28px rgba(124,58,237,0.4); transform: translateY(-1px); }

    .jtc-view-grid {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 24px;
    }

    .jtc-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .jtc-info-item {
      background: #faf7ff;
      border-radius: 16px;
      padding: 16px 18px;
    }

    .jtc-info-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #9ca3af;
      margin-bottom: 6px;
    }

    .jtc-info-value {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
      word-break: break-word;
    }

    .jtc-side-panel {
      border: 1px solid #ede9fe;
      border-radius: 22px;
      overflow: hidden;
    }

    .jtc-side-avatar-wrap {
      background: linear-gradient(160deg, #f5f3ff 0%, #ede9fe 100%);
      padding: 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .jtc-side-big-avatar {
      width: 100px; height: 100px;
      border-radius: 28px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Sora', sans-serif;
      font-size: 38px;
      font-weight: 800;
      margin-bottom: 14px;
      box-shadow: 0 8px 24px rgba(124,58,237,0.15);
    }

    .jtc-side-name {
      font-family: 'Sora', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      text-align: center;
    }

    .jtc-side-company {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 4px;
      text-align: center;
    }

    .jtc-side-actions { padding: 8px 0; }

    .jtc-side-action-btn {
      width: 100%;
      border: none;
      background: transparent;
      padding: 14px 20px;
      text-align: left;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid #f5f3ff;
      transition: background 0.12s, padding-left 0.15s;
    }

    .jtc-side-action-btn:last-child { border-bottom: none; }
    .jtc-side-action-btn:hover { background: #faf7ff; padding-left: 26px; }
    .jtc-side-action-btn.danger { color: #ef4444; }
    .jtc-side-action-btn.danger:hover { background: #fef2f2; }

    /* Edit modal */
    .jtc-edit-title {
      font-family: 'Sora', sans-serif;
      font-size: 22px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 24px;
    }

    .jtc-input-group { margin-bottom: 16px; }

    .jtc-input-label {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: #9ca3af;
      margin-bottom: 6px;
      display: block;
    }

    .jtc-input {
      width: 100%;
      height: 48px;
      border-radius: 12px;
      border: 1.5px solid #e5e7eb;
      padding: 0 16px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #111827;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      background: #fff;
    }

    .jtc-input:focus {
      border-color: #7c3aed;
      box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
    }

    .jtc-textarea {
      width: 100%;
      border-radius: 12px;
      border: 1.5px solid #e5e7eb;
      padding: 14px 16px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #111827;
      outline: none;
      resize: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .jtc-textarea:focus {
      border-color: #7c3aed;
      box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
    }

    .jtc-save-btn {
      width: 100%;
      height: 52px;
      border: none;
      border-radius: 14px;
      background: linear-gradient(135deg, #7c3aed, #9333ea);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 8px;
      box-shadow: 0 6px 24px rgba(124,58,237,0.3);
      transition: box-shadow 0.2s, transform 0.1s;
    }

    .jtc-save-btn:hover { box-shadow: 0 8px 30px rgba(124,58,237,0.4); transform: translateY(-1px); }
    .jtc-save-btn:active { transform: translateY(0); }

    /* ── MOBILE CARD LAYOUT ── */
    .jtc-mobile-list { display: none; }

    .jtc-mobile-card {
      background: #fff;
      border-radius: 20px;
      border: 1px solid #ede9fe;
      padding: 18px;
      margin-bottom: 12px;
      box-shadow: 0 2px 12px rgba(124,58,237,0.06);
      position: relative;
      transition: box-shadow 0.2s;
    }

    .jtc-mobile-card:active { box-shadow: 0 4px 20px rgba(124,58,237,0.12); }

    .jtc-mc-top { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }

    .jtc-mc-avatar {
      width: 50px; height: 50px;
      border-radius: 15px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Sora', sans-serif;
      font-size: 17px;
      font-weight: 800;
      flex-shrink: 0;
    }

    .jtc-mc-info { flex: 1; min-width: 0; }

    .jtc-mc-name {
      font-family: 'Sora', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #111827;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .jtc-mc-email {
      font-size: 12px;
      color: #9ca3af;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    .jtc-mc-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }

    .jtc-mc-pill {
      background: #faf7ff;
      border: 1px solid #ede9fe;
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 12px;
      font-weight: 600;
      color: #6d28d9;
    }

    .jtc-mc-actions { display: flex; gap: 8px; justify-content: flex-end; }

    .jtc-mc-btn {
      height: 40px;
      padding: 0 16px;
      border: 1.5px solid #ede9fe;
      border-radius: 10px;
      background: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #7c3aed;
      cursor: pointer;
      display: flex; align-items: center; gap: 6px;
      transition: background 0.15s, border-color 0.15s;
      white-space: nowrap;
    }

    .jtc-mc-btn:hover { background: #faf7ff; border-color: #7c3aed; }

    .jtc-mc-btn.danger { color: #ef4444; border-color: #fee2e2; }
    .jtc-mc-btn.danger:hover { background: #fef2f2; border-color: #ef4444; }

    .jtc-mc-btn.primary {
      background: linear-gradient(135deg, #7c3aed, #9333ea);
      border: none;
      color: #fff;
    }

    .jtc-mc-btn.primary:hover { opacity: 0.9; }

    .jtc-mc-menu-wrap { position: relative; }

    .jtc-mc-menu {
      position: absolute;
      bottom: calc(100% + 8px);
      right: 0;
      min-width: 190px;
      background: #fff;
      border-radius: 16px;
      border: 1px solid #ede9fe;
      overflow: hidden;
      z-index: 999;
      box-shadow: 0 16px 48px rgba(124,58,237,0.14);
      animation: jtcDropIn 0.15s ease;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      .jtc-thead { display: none; }
      .jtc-row { display: none; }
      .jtc-card .jtc-row { display: none; }
      .jtc-desktop-table { display: none; }
      .jtc-mobile-list { display: block; }
      .jtc-view-grid { grid-template-columns: 1fr; }
      .jtc-info-grid { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 700px) {
      .jtc-root { padding: 20px 14px 60px; }
      .jtc-topbar { flex-direction: column; align-items: stretch; }
      .jtc-search { width: 100%; }
      .jtc-topbar-right { justify-content: space-between; }
      .jtc-modal-overlay { padding: 0; align-items: flex-end; }
      .jtc-modal-box {
        border-radius: 28px 28px 0 0;
        max-height: 92vh;
        padding: 28px 20px;
      }
      .jtc-info-grid { grid-template-columns: 1fr; }
      .jtc-view-header { flex-direction: column; align-items: flex-start; }
    }

    @media (max-width: 420px) {
      .jtc-mc-actions { flex-wrap: wrap; }
      .jtc-mc-btn { flex: 1; justify-content: center; }
    }
  `;

  /* ─── Skeleton Rows ─── */
  const SkeletonRows = () => (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="jtc-skeleton-row">
          <div className="jtc-skel" style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="jtc-skel" style={{ width: "45%", height: 13 }} />
            <div className="jtc-skel" style={{ width: "60%", height: 11 }} />
          </div>
          <div className="jtc-skel" style={{ width: 90, height: 13 }} />
          <div className="jtc-skel" style={{ width: 70, height: 13 }} />
        </div>
      ))}
    </>
  );

  /* ─── Avatar helper ─── */
  const Avatar = ({ name, size = 44, borderRadius = 13, fontSize = 14 }) => {
    const [color, bg] = avatarColor(name);
    return (
      <div style={{ width: size, height: size, borderRadius, background: bg, color, fontSize, fontFamily: "'Sora', sans-serif", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, letterSpacing: "0.5px" }}>
        {initials(name)}
      </div>
    );
  };

  return (
    <>
      <style>{css}</style>
      <div className="jtc-root">

        {/* ── TOP BAR ── */}
        <div className="jtc-topbar">
          <div className="jtc-title-wrap">
            <div className="jtc-icon-badge">📇</div>
            <div>
              <div className="jtc-title">Contacts</div>
              <div className="jtc-subtitle">Manage your network</div>
            </div>
          </div>
          <div className="jtc-topbar-right">
            {!loading && (
              <span className="jtc-count-badge">
                {filteredLeads.length} contact{filteredLeads.length !== 1 ? "s" : ""}
              </span>
            )}
            <div className="jtc-search-wrap">
              <span className="jtc-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="jtc-search"
              />
            </div>
          </div>
        </div>

        {/* ── DESKTOP TABLE ── */}
        <div className="jtc-card jtc-desktop-table">
          <div className="jtc-thead">
            <div className="jtc-th">Contact</div>
            <div className="jtc-th">Company</div>
            <div className="jtc-th">Added</div>
            <div className="jtc-th">VCF</div>
            <div className="jtc-th"></div>
          </div>

          {loading ? (
            <SkeletonRows />
          ) : filteredLeads.length === 0 ? (
            <div className="jtc-empty">
              <span className="jtc-empty-icon">🌐</span>
              <div className="jtc-empty-title">
                {search ? "No results found" : "No contacts yet"}
              </div>
              <div className="jtc-empty-desc">
                {search ? `Nothing matched "${search}"` : "Your contacts will appear here once added."}
              </div>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div key={lead._id} className="jtc-row">
                <div className="jtc-contact-cell">
                  <Avatar name={lead.name} size={44} borderRadius={13} fontSize={14} />
                  <div style={{ minWidth: 0 }}>
                    <div className="jtc-lead-name">{lead.name}</div>
                    <div className="jtc-lead-email">{lead.email}</div>
                  </div>
                </div>
                <div className="jtc-company-cell">{lead.company || "—"}</div>
                <div className="jtc-date-cell">{formatDate(lead.createdAt)}</div>
                <div>
                  <button className="jtc-icon-btn" title="Download VCF" onClick={() => downloadVCF(lead)}>⬇</button>
                </div>
                <div className="jtc-menu-wrap">
                  <button
                    className="jtc-icon-btn"
                    title="Actions"
                    onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === lead._id ? null : lead._id); }}
                  >
                    ⋯
                  </button>
                  {openMenu === lead._id && (
                    <div className="jtc-menu" onClick={(e) => e.stopPropagation()}>
                      <button className="jtc-menu-item" onClick={() => { setSelectedLead(lead); setOpenMenu(null); }}>
                        <span>👁</span> View Contact
                      </button>
                      <button className="jtc-menu-item" onClick={() => { setEditLead(lead); setOpenMenu(null); }}>
                        <span>✏️</span> Edit Contact
                      </button>
                      <button className="jtc-menu-item" onClick={() => { downloadVCF(lead); setOpenMenu(null); }}>
                        <span>⬇</span> Save as VCF
                      </button>
                      <button className="jtc-menu-item danger" onClick={() => { handleDelete(lead._id); setOpenMenu(null); }}>
                        <span>🗑</span> Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── MOBILE CARDS ── */}
        <div className="jtc-mobile-list">
          {loading ? (
            <div className="jtc-card" style={{ borderRadius: 20, overflow: "hidden" }}>
              <SkeletonRows />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="jtc-card jtc-empty" style={{ borderRadius: 20 }}>
              <span className="jtc-empty-icon">🌐</span>
              <div className="jtc-empty-title">{search ? "No results found" : "No contacts yet"}</div>
              <div className="jtc-empty-desc">{search ? `Nothing matched "${search}"` : "Your contacts will appear here once added."}</div>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div key={lead._id} className="jtc-mobile-card">
                <div className="jtc-mc-top">
                  <Avatar name={lead.name} size={50} borderRadius={15} fontSize={17} />
                  <div className="jtc-mc-info">
                    <div className="jtc-mc-name">{lead.name}</div>
                    <div className="jtc-mc-email">{lead.email}</div>
                  </div>
                </div>
                <div className="jtc-mc-pills">
                  {lead.company && <span className="jtc-mc-pill">🏢 {lead.company}</span>}
                  <span className="jtc-mc-pill">📅 {formatDate(lead.createdAt)}</span>
                </div>
                <div className="jtc-mc-actions">
                  <button className="jtc-mc-btn primary" onClick={() => setSelectedLead(lead)}>👁 View</button>
                  <button className="jtc-mc-btn" onClick={() => setEditLead(lead)}>✏️ Edit</button>
                  <button className="jtc-mc-btn" onClick={() => downloadVCF(lead)}>⬇ VCF</button>
                  <button className="jtc-mc-btn danger" onClick={() => handleDelete(lead._id)}>🗑</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── VIEW MODAL ── */}
      {selectedLead && (
        <div className="jtc-modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="jtc-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="jtc-modal-close" onClick={() => setSelectedLead(null)}>×</button>

            <div className="jtc-view-header">
              <div className="jtc-view-user">
                <Avatar name={selectedLead.name} size={72} borderRadius={20} fontSize={26} />
                <div>
                  <div className="jtc-view-name">{selectedLead.name}</div>
                  <div className="jtc-view-email">{selectedLead.email}</div>
                </div>
              </div>
              
            </div>

            <div className="jtc-view-grid">
              <div className="jtc-info-grid">
                {[
                  ["Full Name", selectedLead.name],
                  ["Email", selectedLead.email],
                  ["Phone", selectedLead.phone || "—"],
                  ["Company", selectedLead.company || "—"],
                  ["Added", formatDate(selectedLead.createdAt)],
                  ["Message", selectedLead.message || "—"],
                ].map(([label, value]) => (
                  <div key={label} className="jtc-info-item" style={label === "Message" ? { gridColumn: "1 / -1" } : {}}>
                    <div className="jtc-info-label">{label}</div>
                    <div className="jtc-info-value">{value}</div>
                  </div>
                ))}
              </div>

              <div className="jtc-side-panel">
                <div className="jtc-side-avatar-wrap">
                  <Avatar name={selectedLead.name} size={100} borderRadius={28} fontSize={38} />
                  <div className="jtc-side-name">{selectedLead.name}</div>
                  {selectedLead.company && <div className="jtc-side-company">{selectedLead.company}</div>}
                </div>
                <div className="jtc-side-actions">
                  <button className="jtc-side-action-btn" onClick={() => { setEditLead(selectedLead); setSelectedLead(null); }}>
                    <span>✏️</span> Edit Contact
                  </button>
                  <button className="jtc-side-action-btn" onClick={() => downloadVCF(selectedLead)}>
                    <span>⬇</span> Export VCF
                  </button>
                  <button className="jtc-side-action-btn danger" onClick={() => handleDelete(selectedLead._id)}>
                    <span>🗑</span> Remove Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editLead && (
        <div className="jtc-modal-overlay" onClick={() => setEditLead(null)}>
          <div className="jtc-modal-box small" onClick={(e) => e.stopPropagation()}>
            <button className="jtc-modal-close" onClick={() => setEditLead(null)}>×</button>
            <div className="jtc-edit-title">✏️ Edit Contact</div>

            {[
              ["Name", "name", "text"],
              ["Email", "email", "email"],
              ["Phone", "phone", "tel"],
              ["Company", "company", "text"],
            ].map(([label, field, type]) => (
              <div key={field} className="jtc-input-group">
                <label className="jtc-input-label">{label}</label>
                <input
                  type={type}
                  className="jtc-input"
                  placeholder={label}
                  value={editLead[field] || ""}
                  onChange={(e) => setEditLead({ ...editLead, [field]: e.target.value })}
                />
              </div>
            ))}

            <div className="jtc-input-group">
              <label className="jtc-input-label">Message / Notes</label>
              <textarea
                rows={4}
                className="jtc-textarea"
                placeholder="Message"
                value={editLead.message || ""}
                onChange={(e) => setEditLead({ ...editLead, message: e.target.value })}
              />
            </div>

            <button className="jtc-save-btn" onClick={handleUpdate}>Save Changes</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Leads;