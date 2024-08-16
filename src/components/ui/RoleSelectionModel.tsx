import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface RoleSelectionModalProps {
    onSelectRole: (role: string) => void;
    onClose: () => void;
    walletAddress: string;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ onSelectRole, onClose, walletAddress }) => {
    const [tooltip, setTooltip] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleRoleSelection = async (role: string) => {
        if (isSaving) return;  // Prevent multiple submissions
        setIsSaving(true);

        try {
            const response = await fetch("http://localhost:3001/api/save-role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ walletAddress, role }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.alreadyJoined) {
                    // Show tooltip if address is already in the database
                    setTooltip(`Address ${walletAddress} is already joined as ${data.role}.`);
                } else {
                    console.log("Role saved successfully");
                    onSelectRole(role);
                }
            } else {
                console.error("Failed to save role:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsSaving(false);  // Reset the saving state
        }
    };

    // Automatically hide tooltip after 8 seconds
    useEffect(() => {
        if (tooltip) {
            const timer = setTimeout(() => {
                setTooltip(null);
            }, 8000); // Tooltip visible for 8 seconds
            return () => clearTimeout(timer);
        }
    }, [tooltip]);

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 w-96 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Select Your Role</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                {tooltip && (
                    <div className="fixed top-4 right-4 bg-yellow-500 text-white p-3 rounded-lg shadow-lg animate-fade-in-out">
                        {tooltip}
                    </div>
                )}
                <div className="space-y-4">
                    <button 
                        onClick={() => handleRoleSelection('Employee')} 
                        className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105 duration-300"
                    >
                        Employee
                    </button>
                    <button 
                        onClick={() => handleRoleSelection('Employer')} 
                        className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105 duration-300"
                    >
                        Employer
                    </button>
                    <button 
                        onClick={() => handleRoleSelection('Judiciary')} 
                        className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition transform hover:scale-105 duration-300"
                    >
                        Judiciary
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionModal;
