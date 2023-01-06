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


const noteCollectionRef = collection(db, 'notes')

// Order and limit notes
const noteCollectionQuery = query(noteCollectionRef, orderBy('date', 'desc'));

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
      notes: []
    }
  },


  actions: {
    // Get data on firebase
    async getNotes() {

    // Listen to multiple documents in a collection

      onSnapshot(noteCollectionQuery, (querySnapshot) => {
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
        
      });
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