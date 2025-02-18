import { useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const ReportHandle = ({post, refetch}) => {
    const [isReportDisable, setIsReportDisable] = useState(true);
    const [feedback, setFeedback] = useState(null);
    const axiosSecure = useAxiosSecure();

    const feedbackOptions = [
        { value: "inappropriate", label: "The content is inappropriate" },
        { value: "misleading", label: "The content is misleading" },
        { value: "violatesPolicies", label: "The content violates policies" },
    ];
    const handleFeedbackChange = (feedbackOption) => {
        setFeedback(feedbackOption);
        setIsReportDisable(false);
    };
    const handleReportClick = async (post) => {
        const reportInfo = {
            commentUserName: post.commentUserName,
            commentUserEmail: post.commentUserEmail,
            commentDetails: post.commentDetails,
            commentId: post._id,
            postTitle : post.postTitle,
            postId: post.postId,
            feedback: feedback.value,
        }
        const res = await axiosSecure.post('/reports', reportInfo)
        // console.log(res.data)
        refetch()
    };
    return (
        <td className="w-full flex py-5">

            <Select
                options={feedbackOptions}
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Select Feedback"
                isDisabled={post.report}
                isClearable // Allows clearing the selected value
                className="btn bg-transparent"
            />

            {/* Report button */}
            {
                post?.report ? <div><button  disabled className="btn">Report</button><p className="text-red-600">Your report is on ending</p></div> : <button
                onClick={() => handleReportClick(post)}
                disabled={isReportDisable}
                className="btn bg-blue-400"
            >
                Report
            </button>
            }
        </td>
    );
};

export default ReportHandle;