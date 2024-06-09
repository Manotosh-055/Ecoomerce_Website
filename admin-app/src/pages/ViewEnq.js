import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAEnquiry, getEnquiries, updateEnquiry } from '../features/enquiry/enquirySlice';
import { BiArrowBack } from 'react-icons/bi';
const ViewEnq = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getEnqId = location.pathname.split("/")[3];
    const enqstate = useSelector((state) => state.enquiry);
    const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqstate;

    useEffect(() => {
        dispatch(getAEnquiry(getEnqId));
    }, [getEnqId]);

    const goBack = () => {
        navigate(-1);
    }

    const setEnqStatus = (e, i) => {
        const data = { id: i, enqData: e }
        dispatch(updateEnquiry(data));
        setTimeout(() => {
            dispatch(getAEnquiry(getEnqId));
            dispatch(getEnquiries());
        }, 100);
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <h2 className="mb-4 title">View Enquiriy</h2>
                <button onClick={goBack} className='bg-transparent border-0 d-flex align-items-center gap-1'><BiArrowBack className='fs-5' />
                    Go Back
                </button>
            </div>
            <div className='mt-5 bg-white d-flex gap-3 flex-column p-4 rounded-3'>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Name :</h6>
                    <p className="mb-0">{enqName}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Mobile :</h6>
                    <p className="mb-0"><a href={`tel:+91${enqMobile}`}>{enqMobile}</a></p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Email :</h6>
                    <p className="mb-0"><a href={`mailto:${enqEmail}`}>{enqEmail}</a></p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Comment :</h6>
                    <p className="mb-0">{enqComment}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Status :</h6>
                    <p className="mb-0">{enqStatus}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Change Status :</h6>
                    <div>
                        <select className="form-control form-select"
                            defaultValue={enqStatus ? enqStatus : "Submitted"}
                            name=""
                            id=""
                            onChange={(e) => setEnqStatus(e.target.value, getEnqId)}
                        >
                            <option value="Submitted">Submitted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewEnq;