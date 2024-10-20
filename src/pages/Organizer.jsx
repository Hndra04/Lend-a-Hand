import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import ActionInstance from '../components/ActionInstance';
import HeaderOrganizer from '../components/HeaderOrganizer';

const Organizer = () => {
  // Accept user credential
  const location = useLocation();
  const { userId } = location.state || {}; // Safely access userId

  const navigate = useNavigate(); 

  const addActivity = (userId) => {
    navigate('/add-activity', { state: { userId }});
  };

  // Store organizer data
  const [data, setData] = useState([]);

  // Use to filter actions
  const [filter, setFilter] = useState('All');

  // Setup action variable & GET function
  const[actionList, setActionList] = useState([])
  const actionCollection = collection(db, "actions")

  const[organizerList, setOrganizer] = useState([])
  const organizersCollection = collection(db, "organizers")

  // Filter organizer actions
  useEffect(() => {
    // Define an async function to fetch activities
    const fetchActivities = async () => {
      try {
        // Filtering to only organizer's actions
        const q = query(actionCollection, where("by", "==", userId));
        
        // Execute the query
        const querySnapshot = await getDocs(q);
        
        // Map through the documents and extract data
        const activities = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update the state with the fetched activities
        setActionList(activities)
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    // Call the async function
    fetchActivities();
  }, [userId]);

  // Get organizer data
  const docRef = doc(db, 'organizers', userId);
  useEffect(() => {
    getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data())
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error fetching document:", error.message);
    });
  }, [])

  useEffect(() => {
    const getOrganizerList = async () => {
      try{
        const data = await getDocs(organizersCollection)
        const processedData = data.docs.map(doc => ({...doc.data(), id: doc.id}))

        setOrganizer(processedData)
      } catch(err) {
        console.error(err)
      }
    }

    getOrganizerList()
  }, [])

  const findOrganizer = (id) => {
    const organizer = organizerList.find(element => element.id === id);
    return organizer ? organizer.name : "Unknown";
  }

  let content = (
    <>
      {
        actionList.map((activity) => (
          filter == 'All' ?
            <ActionInstance key={activity.id} width='w-2/6' description={activity['description']} by={findOrganizer(activity['by'])} />

          : activity.type == filter ?
            <ActionInstance key={activity.id} width='w-2/6' description={activity['description']} by={findOrganizer(activity['by'])} />
            
            : ""
        ))
      }
    </>
  );
  useEffect(() => {
    content = content
  }, [filter])

  return (
    <>
      <HeaderOrganizer login={userId}/>

      <div className='font-bold text-3xl raleway flex justify-between items-center px-20 py-10' style={{backgroundColor: '#EEF7FF'}}>
         <div>Welcome, {data.name}</div>
         <button className='bg-orange text-white text-xl px-4 py-2 rounded-full hover' onClick={() => {addActivity(userId)}}>Add new action</button>
      </div>

      <div className='py-4'>
        <SearchBar filter={filter} setFilter={setFilter}/>
      </div>

      <div className='flex flex-wrap px-10 gap-10 justify-center pb-20'>
        {content}
      </div>

      <Footer />
    </>
  )
}

export default Organizer