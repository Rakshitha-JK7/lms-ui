import { useState } from "react";
import "./settings.css";

const Settings = () => {

  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const saveSettings = () => {

    const settings = {
      theme,
      notifications,
      lang: language
    };

    console.log(settings);

  };

  return (
    <div className="settings-content">

      <div className="settings-title">
        <h1>Settings</h1>
        <p>Manage your LMS preferences and account settings</p>
      </div>

      <div className="settings-card">

        <div className="settings-card-header">
          <div className="settings-icon">
            ◐
          </div>

          <div>
            <h2>Appearance</h2>
            <p>Customize how the LMS looks</p>
          </div>
        </div>


        <div className="setting-row">

          <div>
            <h3>Theme</h3>
            <p>Choose your preferred theme</p>
          </div>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

        </div>

      </div>


      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-icon">
            🔔
          </div>

          <div>
            <h2>Notifications</h2>
            <p>Control how you receive notifications</p>
          </div>

        </div>


        <div className="setting-row">

          <div>
            <h3>Email Notifications</h3>
            <p>Receive important LMS updates and alerts</p>
          </div>

          <label className="switch">

            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />

            <span className="slider"></span>

          </label>

        </div>

      </div>

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-icon">
            文
          </div>

          <div>
            <h2>Language</h2>
            <p>Select the language used throughout the LMS</p>
          </div>

        </div>


        <div className="setting-row">

          <div>
            <h3>Language</h3>
            <p>Choose your preferred language</p>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Kannada">Kannada</option>
            <option value="Hindi">Hindi</option>
          </select>

        </div>

      </div>


      <div className="settings-actions">

        <button
          className="save-settings-btn"
          onClick={saveSettings}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
};

export default Settings;