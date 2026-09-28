import React, { useEffect, useState } from "react";
import resultService from "../services/resultService";
import {
  fetchEvents
} from "../services/api";

export default function AdminResults() {

  const [events, setEvents] = useState([]);
  const [results, setResults] = useState([]);

  const [selectedEventId, setSelectedEventId] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    position: "FIRST",
    participantName: "",
    teamName: "",
    collegeName: "",
    score: "",
    remarks: "",
    published: false
  });


  // ==========================================
  // LOAD EVENTS
  // ==========================================

  useEffect(() => {
    loadEvents();
  }, []);


  const loadEvents = async () => {

    try {

      setLoading(true);

      const data = await fetchEvents();

      setEvents(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Failed to load events:", error);

      setEvents([]);

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // LOAD RESULTS WHEN EVENT CHANGES
  // ==========================================

  useEffect(() => {

    if (!selectedEventId) {

      setResults([]);

      return;
    }

    loadResults(selectedEventId);

  }, [selectedEventId]);


  const loadResults = async (eventId) => {

    try {

      const data =
        await resultService.getResultsByEvent(eventId);

      setResults(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Failed to load results:", error);

      setResults([]);

    }
  };


  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));

  };


  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {

    setForm({
      position: "FIRST",
      participantName: "",
      teamName: "",
      collegeName: "",
      score: "",
      remarks: "",
      published: false
    });

    setEditingId(null);

  };


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!selectedEventId) {

      alert("Please select an event.");

      return;
    }

    if (!form.participantName.trim()) {

      alert("Please enter the participant/winner name.");

      return;
    }

    try {

      setSaving(true);

      if (editingId) {

        await resultService.updateResult(
          editingId,
          selectedEventId,
          form
        );

        alert("Result updated successfully.");

      } else {

        await resultService.createResult(
          selectedEventId,
          form
        );

        alert("Result created successfully.");

      }

      resetForm();

      await loadResults(selectedEventId);

    } catch (error) {

      console.error("Failed to save result:", error);

      alert(
        error?.message ||
        "Failed to save result."
      );

    } finally {

      setSaving(false);

    }
  };


  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (result) => {

    setEditingId(result.id);

    setForm({
      position: result.position || "FIRST",
      participantName: result.participantName || "",
      teamName: result.teamName || "",
      collegeName: result.collegeName || "",
      score: result.score || "",
      remarks: result.remarks || "",
      published: result.published || false
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmed) return;

    try {

      await resultService.deleteResult(id);

      await loadResults(selectedEventId);

    } catch (error) {

      console.error("Failed to delete result:", error);

      alert(
        error?.message ||
        "Failed to delete result."
      );

    }
  };


  // ==========================================
  // PUBLISH / UNPUBLISH
  // ==========================================

  const handleTogglePublish = async (id) => {

    try {

      await resultService.togglePublish(id);

      await loadResults(selectedEventId);

    } catch (error) {

      console.error(
        "Failed to publish/unpublish result:",
        error
      );

      alert(
        error?.message ||
        "Failed to update publish status."
      );

    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          background: "#070913",
          color: "white"
        }}
      >
        <h1>Results</h1>

        <p>
          Loading events...
        </p>
      </div>
    );
  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "#070913",
        color: "#ffffff"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          marginBottom: "30px"
        }}
      >

        <h1
          style={{
            fontSize: "32px",
            fontWeight: "800",
            margin: 0
          }}
        >
          Event Results
        </h1>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "8px"
          }}
        >
          Enter and publish winners for COLORIDO 2K26 events.
        </p>

      </div>


      {/* EVENT SELECT */}

      <div
        style={{
          background: "#111528",
          border: "1px solid #272b45",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "25px"
        }}
      >

        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "700"
          }}
        >
          Select Event
        </label>

        <select
          value={selectedEventId}
          onChange={(e) => {
            setSelectedEventId(e.target.value);
            resetForm();
          }}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "13px",
            borderRadius: "10px",
            border: "1px solid #3b4166",
            background: "#0b0e1e",
            color: "white",
            fontSize: "15px"
          }}
        >

          <option value="">
            -- Select Event --
          </option>

          {events.map((event) => (

            <option
              key={event.id}
              value={event.id}
            >
              {event.name}
            </option>

          ))}

        </select>

      </div>


      {/* RESULT FORM */}

      {selectedEventId && (

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#111528",
            border: "1px solid #272b45",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "30px"
          }}
        >

          <h2
            style={{
              marginTop: 0,
              marginBottom: "20px"
            }}
          >
            {editingId
              ? "Edit Result"
              : "Enter Winner / Result"}
          </h2>


          {/* POSITION */}

          <div style={{ marginBottom: "16px" }}>

            <label>
              Position
            </label>

            <select
              name="position"
              value={form.position}
              onChange={handleChange}
              style={inputStyle}
            >

              <option value="FIRST">
                1st Place
              </option>

              <option value="SECOND">
                2nd Place
              </option>

              <option value="THIRD">
                3rd Place
              </option>

              <option value="SPECIAL_MENTION">
                Special Mention
              </option>

              <option value="PARTICIPATION">
                Participation
              </option>

            </select>

          </div>


          {/* PARTICIPANT */}

          <div style={{ marginBottom: "16px" }}>

            <label>
              Participant / Winner Name
            </label>

            <input
              name="participantName"
              value={form.participantName}
              onChange={handleChange}
              placeholder="Enter winner name"
              style={inputStyle}
            />

          </div>


          {/* TEAM */}

          <div style={{ marginBottom: "16px" }}>

            <label>
              Team Name
            </label>

            <input
              name="teamName"
              value={form.teamName}
              onChange={handleChange}
              placeholder="Optional"
              style={inputStyle}
            />

          </div>


          {/* COLLEGE */}

          <div style={{ marginBottom: "16px" }}>

            <label>
              College Name
            </label>

            <input
              name="collegeName"
              value={form.collegeName}
              onChange={handleChange}
              placeholder="College name"
              style={inputStyle}
            />

          </div>


          {/* SCORE */}

          <div style={{ marginBottom: "16px" }}>

            <label>
              Score
            </label>

            <input
              name="score"
              value={form.score}
              onChange={handleChange}
              placeholder="Optional"
              style={inputStyle}
            />

          </div>


          {/* REMARKS */}

          <div style={{ marginBottom: "16px" }}>

            <label>
              Remarks
            </label>

            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              placeholder="Optional remarks"
              rows="3"
              style={{
                ...inputStyle,
                resize: "vertical"
              }}
            />

          </div>


          {/* PUBLISHED */}

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px"
            }}
          >

            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />

            Publish immediately

          </label>


          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}
          >

            <button
              type="submit"
              disabled={saving}
              style={{
                background: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "12px 20px",
                cursor: "pointer",
                fontWeight: "700"
              }}
            >

              {saving
                ? "Saving..."
                : editingId
                ? "Update Result"
                : "Save Result"}

            </button>


            {editingId && (

              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: "#374151",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  cursor: "pointer"
                }}
              >
                Cancel Edit
              </button>

            )}

          </div>

        </form>

      )}


      {/* EXISTING RESULTS */}

      {selectedEventId && (

        <div>

          <h2
            style={{
              marginBottom: "15px"
            }}
          >
            Existing Results
          </h2>


          {results.length === 0 ? (

            <div
              style={{
                background: "#111528",
                border: "1px solid #272b45",
                borderRadius: "16px",
                padding: "40px",
                textAlign: "center",
                color: "#9ca3af"
              }}
            >
              No results entered for this event yet.
            </div>

          ) : (

            <div
              style={{
                display: "grid",
                gap: "15px"
              }}
            >

              {results.map((result) => (

                <div
                  key={result.id}
                  style={{
                    background: "#111528",
                    border: "1px solid #272b45",
                    borderRadius: "16px",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexWrap: "wrap"
                  }}
                >

                  <div>

                    <div
                      style={{
                        color: "#fbbf24",
                        fontWeight: "800",
                        marginBottom: "5px"
                      }}
                    >
                      {result.position}
                    </div>

                    <h3
                      style={{
                        margin: "0 0 5px"
                      }}
                    >
                      {result.participantName}
                    </h3>

                    {result.teamName && (
                      <p>
                        Team: {result.teamName}
                      </p>
                    )}

                    {result.collegeName && (
                      <p>
                        College: {result.collegeName}
                      </p>
                    )}

                    {result.score && (
                      <p>
                        Score: {result.score}
                      </p>
                    )}

                    {result.remarks && (
                      <p>
                        {result.remarks}
                      </p>
                    )}

                    <strong
                      style={{
                        color: result.published
                          ? "#4ade80"
                          : "#f87171"
                      }}
                    >
                      {result.published
                        ? "Published"
                        : "Not Published"}
                    </strong>

                  </div>


                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      flexWrap: "wrap"
                    }}
                  >

                    <button
                      onClick={() =>
                        handleEdit(result)
                      }
                      style={buttonStyle}
                    >
                      Edit
                    </button>


                    <button
                      onClick={() =>
                        handleTogglePublish(result.id)
                      }
                      style={{
                        ...buttonStyle,
                        background: result.published
                          ? "#92400e"
                          : "#166534"
                      }}
                    >
                      {result.published
                        ? "Unpublish"
                        : "Publish"}
                    </button>


                    <button
                      onClick={() =>
                        handleDelete(result.id)
                      }
                      style={{
                        ...buttonStyle,
                        background: "#991b1b"
                      }}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      )}

    </div>
  );
}


// ==========================================
// STYLES
// ==========================================

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  marginTop: "7px",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #3b4166",
  background: "#0b0e1e",
  color: "white",
  outline: "none",
  fontSize: "15px"
};


const buttonStyle = {
  border: "none",
  borderRadius: "8px",
  padding: "10px 15px",
  background: "#374151",
  color: "white",
  cursor: "pointer",
  fontWeight: "700"
};