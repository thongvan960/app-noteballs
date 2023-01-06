import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import { 
  collection, 
  onSnapshot, 
  doc, 
  //setDoc, 
  addDoc,
  deleteDoc,
  updateDoc,
  query, orderBy, 

} from 'firebase/firestore';
import { useStoreAuth } from '@/stores/storeAuth'


let noteCollectionRef

// Order and limit notes
let noteCollectionQuery 

let getSnapshotNotes = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [],
      notesLoaded: false,
    }
  },


  actions: {
    // init
    init() {
      const storeAuth = useStoreAuth()

      // console.log(storeAuth.user.id);

      noteCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      noteCollectionQuery = query(noteCollectionRef, orderBy('date', 'desc'));

      this.getNotes()
    },
    // Get data on firebase
    async getNotes() {
      

    // Listen to multiple documents in a collection
      this.notesLoaded = false

      // unsubscribe from any active listener
      if (getSnapshotNotes) {
        getSnapshotNotes()
      }
      getSnapshotNotes = onSnapshot(noteCollectionQuery, (querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((doc) => {
            
            let note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date
            }
            notes.push(note)
        });
        
        this.notes = notes
        this.notesLoaded = true        
      });
    },

    clearNotes () {
      this.notes = []
      if (getSnapshotNotes) {
        getSnapshotNotes()
      }
    },

    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
          date = currentDate.toString()

      // Add a new document with a generated id.
      await addDoc(noteCollectionRef, {
        content: newNoteContent,
        date
      });

    },

    // Delete documents
    async deleteNote(idToDelete) {
      // this.notes = this.notes.filter(note => note.id !== idToDelete )
      await deleteDoc(doc(noteCollectionRef, idToDelete));
    },

    // Update a document
    async updateNote(id, content) {  
     // Set the "capital" field of the city 'DC'
      await updateDoc(doc(noteCollectionRef, id), {
        content
      });
    }
  },


  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id )[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})