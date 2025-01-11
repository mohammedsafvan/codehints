import editor, { Editor } from "@monaco-editor/react"

export default function Monaco({handleCodeChange}){
    
    return(
    <div className="h-full">
        <Editor
        height="100%"
        defaultValue="##Develop your python application below"
        language="python"
        onChange={handleCodeChange}/>
    </div>)
}