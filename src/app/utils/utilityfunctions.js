import axios from 'axios';
import toast from 'react-hot-toast';

export const setasverifiedhandler = async (email) => {
  const toastId = toast.loading('Sending email...');
  try {
    const { data } = await axios.post("/api/sendsignupemail", { email });
    console.log(data);
    if (data.success) {
      toast.success('Email sent successfully!', { id: toastId });
      return true;
    } else {
      toast.error('Failed to send email.', { id: toastId });
      return false;
    }
  } catch (err) {
    console.error("Error sending email:", err);
    toast.error('Error sending email.', { id: toastId });
    return false;
  }
};
export const setrejectedhandler = async (email) => {
  const toastId = toast.loading('Sending email...');
  try {
    const { data } = await axios.post("/api/setasrejected", { email });
    console.log(data);
    if (data.success) {
      toast.success('Email sent successfully!', { id: toastId });
      return true;
    } else {
      toast.error('Failed to send email.', { id: toastId });
      return false;
    }
  } catch (err) {
    console.error("Error sending email:", err);
    toast.error('Error sending email.', { id: toastId });
    return false;
  }
}
