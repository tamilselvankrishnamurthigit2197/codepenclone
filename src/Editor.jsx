import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/material-darker.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import {Controlled as ControlledEditor} from 'react-codemirror2'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompressAlt, faExpandAlt, faMoon, faSun} from '@fortawesome/free-solid-svg-icons'

export default function Editor(props){
  const {
      language,
      displayName,
      value,
      onChange} = props;

      const [open, setOpen] = useState(true)
      const [darkMode, setDarkMode] = useState(false);

      function handleChange(editor, data, value) {
        onChange(value);
      }
  return(
    <div className={`editor-container ${open ? '' : 'collapsed'} ${darkMode ? 'dark mode' : ''}`}>
      <div className='editor-title'>
        {displayName}

        <button
          type='button'
          className='expand-collapse-btn'
          onClick={()=>setOpen(prevOpen => !prevOpen)}>
            <FontAwesomeIcon 
              icon={open ? faCompressAlt : faExpandAlt} />
          </button>
          <button
            type="button"
            className="expand-collapse-btn"
            onClick={()=>setDarkMode(prev => !prev)}>
            <FontAwesomeIcon 
              icon={darkMode ? faSun : faMoon} />
          </button>
      </div>

      {/* editor function */}
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className='code-mirror-wrapper'
        options={{
          mode:language,
          lint:true,
          theme:darkMode ? 'material-darker' : 'default',
          lineWrapping:true,
          lineNumbers:true,
        }} />
    </div>
  )
}