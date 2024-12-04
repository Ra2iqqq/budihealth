import React, { useEffect, useState } from "react";

type Helpline = {
  phone: string;
  email: string;
  website: string;
  description: string;
};

const Helpline = () => {
  const [helpline, setHelpline] = useState<Helpline | null>(null);

  useEffect(() => {
    fetch("NEXT_PUBLIC_POCKETBASE_BASE_URL")
      .then((response) => response.json())
      .then((data) => setHelpline(data))
      .catch((error) => console.error("Error fetching helpline data:", error));
  }, []);

  if (!helpline) {
    return <p className="text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <h1 className="text-xl font-semibold text-gray-700 mb-4">
        Helpline Information
      </h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-gray-600">Phone:</span>
          <a href={`tel:${helpline.phone}`} className="text-blue-500">
            {helpline.phone}
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-bold text-gray-600">Email:</span>
          <a href={`mailto:${helpline.email}`} className="text-blue-500">
            {helpline.email}
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-bold text-gray-600">Website:</span>
          <a href={helpline.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {helpline.website}
          </a>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">{helpline.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Helpline;
