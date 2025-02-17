import React, { useEffect, useState } from 'react'
import Editor from './Editor'
import useLocalStorage from './hooks/useLocalStorage'


const App = () => {

  /* split panes */
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')

  /* to get the mixed value under one structure, use doctype structure  */
  const [srcDoc, setSrcDoc] = useState('')
  /* to get the value once it changes/loads a new/the value */

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setSrcDoc(`
        <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>`)
    }, 250)
    return ()=>clearTimeout(timeout)
  }, [html, css, js])
  return (
    <>
    <div className='pane top-pane'>
    <Editor 
      language="xml"
      displayName="HTML"
      value={html}
      onChange={setHtml}
       />
    <Editor 
      language="css"
      displayName="CSS"
      value={css}
      onChange={setCss} />
    <Editor 
      language="javascript"
      displayName="JS"
      value={js}
      onChange={setJs} />
    </div>

    {/* frame of last */}
    <div className='pane'>
    <iframe
      srcDoc={srcDoc}
      title='output'
      sandbox='allow-scripts'
      frameBorder={0}
      width="100%"
      height="100%" />
    </div>
    </>
  )
}

export default App
