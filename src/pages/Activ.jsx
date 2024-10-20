import React, { useState } from 'react';
import DetailsButton from '../components/DetailsButton'
import ApplyButton from '../components/ApplyButton'
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const Activ = () => {
    const [filter, setFilter] = useState('All');

    const activities = [
        { id: 1, description: 'Desc Activity 1', host: 'By xxx', type: 'Activity' },
        { id: 2, description: 'Desc Donation 1', host: 'By xxx', type: 'Donation' },
        { id: 3, description: 'Desc Campaign 1', host: 'By xxx', type: 'Campaign' },
        { id: 4, description: 'Desc Activity 2', host: 'By xxx', type: 'Activity' },
    ];

    const filteredActivities = activities.filter((activity) =>
        filter === 'All' ? true : activity.type === filter
    );
    
    return (
      <div style={{backgroundColor: '#F0F0F0'}}>
        <NavBar/>
        <h2 className="text-3xl font-bold mb-5 text-left px-[10%] pb-[2%] pt-[3%]">
            Activity Name
        </h2>
        <div className='pb-10'>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-[10%]">
                <div className='flex flex-col'>
                    <div className="p-4 min-w-[500px] h-[380px] rounded-lg relative" style={{ backgroundColor: '#9ED2FF', borderRadius: '15px' }}>
                        <img src=""/>
                    </div>
                    <div className="p-7 flex items-center gap-6">
                        <img src="" className="w-[100px] h-[100px]" style={{ backgroundColor: '#9ED2FF', borderRadius: '100px' }} />
                        <div className="flex-1 flex justify-between items-center">
                            <p className="text-2xl font-medium">Organization Name</p>
                        </div>
                        <div className='text-xl'><ApplyButton/></div>
                    </div>
                    <div className="text-xl font-bold mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis metus ullamcorper,
                        congue turpis interdum, faucibus est. Praesent elementum ac dolor at
                        lobortis. Curabitur commodo id nisi sit amet pretium. Nulla et magna
                        ornare, iaculis est vitae, pellentesque sapien. Donec quis semper
                        justo. Donec vulputate, nisi sed iaculis mollis, justo tortor semper
                        metus, quis pulvinar quam urna a quam. Nulla facilisi. Duis non
                        pharetra nulla. In hac habitasse platea dictumst. Ut sed magna
                        convallis, vestibulum nisi et, hendrerit ante. Nulla scelerisque
                        dignissim ullamcorper.</div>
                </div>

                <div className="p-4 min-w-[500px] h-[100px] flex flex-col">
                    <div className="text-3xl font-bold mb-2">Tags</div>
                        <div className="flex-1 flex justify-between items-center">
                        <button className="text-gray-600 font-medium mb-4">#aa</button>
                    </div>

                    <div className="py-5 min-w-[500px] h-[100px]">
                        <div className="text-2xl font-bold mb-2">Available From --</div>
                    </div>

                    <div className="mb-7 p-5 min-w-[500px] h-[380px] rounded-lg relative" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                    <div className="text-2xl font-bold mb-2">What We're Going to do
                        <br/>- ... <br/>- ... <br/>- ... <br/>- ... <br/>- ... 
                    </div>
                    </div>

                    <div className="mb-7 p-5 min-w-[500px] h-[380px] rounded-lg relative" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                    <div className="text-2xl font-bold mb-2">Goals of this activity
                        <br/>- ... <br/>- ... <br/>- ... <br/>- ... <br/>- ... 
                    </div>
                    </div>
                </div>
            </section>
            </div>
        <Footer />
      </div>
    );
  };
  
  export default Activ;