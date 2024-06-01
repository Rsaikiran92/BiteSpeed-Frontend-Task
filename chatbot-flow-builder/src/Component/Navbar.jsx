function Navbar({handleSave}){
    return(<>
    <div style={{display:"flex",justifyContent:'end',backgroundColor:"#f1f0f0"}}>
        <button onClick={handleSave}>Save</button>
    </div>
    </>)
}

export default Navbar