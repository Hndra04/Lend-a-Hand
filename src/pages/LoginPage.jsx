import React, { useEffect, useState } from "react"; 
import Footer from "../components/Footer"; 
import Header from "../components/Header"; 
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const LoginPage = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null); // For error messages
    const [loading, setLoading] = useState(false); // For loading state

    const goToMain = (userData) => {
        navigate('/activities', { state: { userData }});
    };

    const goToOrganizer = (userId) => {
        navigate('/organizer', { state: { userId }});
    };

    const getDocumentById = async (collectionName, docId) => {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
    };
  
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const data = await getDocumentById('users', userId);
                setUserData(data);
            }
        };
        fetchData(); 
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(null); // Reset error state

        setLoading(true); // Set loading state
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const id = userCredential.user.uid;

            const docRef = doc(db, 'organizers', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                goToOrganizer(id);
            } else {
                setUserId(id);
                goToMain(userData);
            }
        } catch (error) {
            setError("Login failed: " + error.message); // Update error state
            console.log("Login error:", error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="raleway">
            <Header />
            <div style={{height: '90vh'}} className=" flex items-center justify-center bg-white">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-16">
                    <div className="md:w-1/2 md:text-left mb-6 md:mb-0 flex flex-col gap-3 px-20">
                        <h1 className="text-6xl text-center font-bold">Welcome back!</h1>
                        <h2 className="text-3xl text-center font-semibold">
                            Let's continue our mission
                        </h2>
                        <div className="flex justify-center md:justify-center mt-3">
                            <img
                                src="/assets/Icons/Logo.png"
                                alt="Lend-a-Hand Logo"
                                className="h-60 filter invert sepia(0%) saturate(0%) hue-rotate(-180deg) brightness(100%)"
                            />
                        </div>
                    </div>

                    <div className="md:w-1/2 bg-white rounded-lg p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div>
                                <label htmlFor="email" className="font-bold blue">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required // Make email required
                                    aria-label="Email" // Accessibility improvement
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="font-bold blue">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-3 border rounded-md"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required // Make password required
                                    aria-label="Password" // Accessibility improvement
                                />
                            </div>
                            
                            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                            
                            <a href="forgot" className="text-blue-400 font-bold">
                                I forgot my password {'>'}
                            </a>
                            <button
                                type="submit"
                                className={`bg-orange text-white py-3 font-bold rounded-md hover:opacity-90 transition ${loading ? "opacity-50" : ""}`} // Disable button when loading
                                disabled={loading} // Disable button during loading
                            >
                                {loading ? "Logging in..." : "LOGIN"} {/* Change button text during loading */}
                            </button>
                            <p className="text-center text-gray-600 font-semibold">
                                No Account Yet?{" "}
                                <a href="/signup-page" className="text-blue-500">
                                    Sign up for an account {'>'}
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
