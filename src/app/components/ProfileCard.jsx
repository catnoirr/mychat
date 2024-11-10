import { FaLinkedin } from 'react-icons/fa';

const ProfileCard = ({ name, rollno, course, linkedinId }) => {
  return (
    <div className="w-120 md:w-160 lg:w-192 xl:w-256 bg-white rounded-3xl border border-gray-200 shadow-3xl p-12">
      <h2 className="text-5xl font-semibold text-center text-gray-800 py-3">Sagar Paswan</h2>
      <p className="text-2xl text-center text-gray-600">Roll No: 2301301002</p>
      <p className="text-2xl text-center text-gray-600">Course: B.Tech CSE </p>
      <div className="flex justify-center items-center mt-10 gap-6  border-4 rounded-full px-7 py-3 shadow-lg ">
        <a
          href={`https://www.linkedin.com/in/sagar-paswan-2a9924295/${linkedinId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-blue-600 text-6xl hover:text-blue-800" />
        </a>
        <p className="text-center text-xl text-gray-500 ">
      linkedin.com/in/sagar-paswan-2a9924295/{linkedinId}
      </p>
      </div>
     
    </div>
  );
};

export default ProfileCard;
