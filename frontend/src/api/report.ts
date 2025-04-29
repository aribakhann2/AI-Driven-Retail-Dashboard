import axios from 'axios';

export const getReports = async () => {
    try {
      console.log('Getting reports...');
      const token = localStorage.getItem("token");
      const response = await axios.get(
        'http://localhost:5000/api/reports',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data.reports; // Expecting a JSON object like { sales_report: "...", mba_report: "..." }
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      alert('Could not fetch reports. Please try again.');
      return {};
    }
  };