import React from 'react'

const Settings = () => {
  return (
    <div id="settings-form"> 
      <button id="settings-button">Settings</button>
        <div class="settings" id="settings">
        <form class="name-form" id="name-form" action="#">
          <input class="name-input" type="text" id="name-input" placeholder="Type your name here..."/>
      <button type="submit" class="name-button">Add</button>
        </form>
        </div>
    </div>
  )
}

export default Settings;
