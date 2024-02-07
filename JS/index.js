const addbtn=document.querySelector("#btn"); /// access add note button
const main=document.querySelector("#main"); /// selector for main div

addbtn.addEventListener( 
    "click",
   function(){
    addNote() // this function will be called when user clicks on add note button 
   }
)


const addNote=(text="")=>{ // it will create a new note
    const note =document.createElement("div"); // creates a new div in document
    note.classList.add("note");  // classname is note
    note.innerHTML=` 
        <div class="tool">
            <i class="save fa-solid fa-floppy-disk"></i>
            <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea class="text">${text}</textarea>
    `

    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove() // it will be called when user clicks on trash button
            saveNotes() // after trash rest note will be saved
        }
    )

    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes() // it will be called when user clicks on save button
        }
    )

    note.querySelector("textarea").addEventListener(
        "focusout", // after writing a note if user doesnot click on save button then by default
        function() {
            saveNotes() // this function will be called to save the note
        }
    )

    main.appendChild(note); /// in main div the note will be append
    saveNotes() /// by default this function will be called
}


/// it is used to save the notes in local storage memory
const saveNotes=()=>{
    const notes=document.querySelectorAll(".note textarea"); // access text area of notes
    console.log(notes);
    const data=[]; /// make an array
    notes.forEach(
        (note)=>{
            data.push(note.value); /// every note value will be pushed in array
        }
    )
    if(data.length==0)localStorage.removeItem("notes"); /// no data then remove it from local storage
    else localStorage.setItem("notes",JSON.stringify(data)); // stores the notes in the form of strings

}


(
    function(){
        const lsNotes=JSON.parse(localStorage.getItem("notes")) // makes an string to object 
        if(lsNotes===null)addNote(); /// if  no any notes is 
        // available in local storage then it will create an empty note
        else{
            // it will iterate through all the note and show it
            lsNotes.forEach(
                (lsNote)=>{
                    addNote(lsNote); // passing lsnote as argument to add in note
                }
            )
        }
    }
)()



























