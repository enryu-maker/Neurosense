import axios from "axios";
import axiosIns, { baseURL } from "../../helper/Helper";
import { toast } from "react-toastify";


export const postUser = (data, setLoading, navigate, setShow, setData) => {
    return async (dispatch) => {
        try {
            await axiosIns.post('/user/create', data)
                .then((res) => {
                    console.log(res);
                    toast.success(res?.data?.message || "User created successfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setData(res.data)
                    setLoading(false);
                    // navigate('/admin/user');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
}

export const getReports = (setLoading, setData, search = '', skip = 0, setTotal = () => { }) => {
    return async (dispatch) => {
        try {
            setLoading(true);

            const params = {
                search,
                skip,
                limit: 10,
            };

            await axiosIns.get('/reports/', { params })
                .then((res) => {
                    console.log(res);
                    setData(res.data?.reports || []);
                    setTotal(res.data?.total || 0); // assuming response has `total`
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
};

export const delete_report = (report_id, setLoading) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.delete(`/reports/${report_id}`)
                .then((res) => {
                    console.log(res.data);
                    setLoading(false);
                    toast.success("Report deleted successfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
}


export const getUser = (setLoading, setData) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.get('/user/')
                .then((res) => {
                    console.log(res);
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
}

export const getLogs = (setLoading, setData) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.get('/logs/')
                .then((res) => {
                    console.log(res);
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
}

export const getDashData = (setLoading, setData) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.get('/user/user-stats')
                .then((res) => {
                    console.log(res);
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
}

export const getChartData = (setLoading, setData, timeframe, setSalecount) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.get(`/reports/charts?interval=${timeframe}`)
                .then((res) => {
                    console.log("report Data", res);
                    setData(res.data);
                    setLoading(false);
                    setSalecount({
                        labelList: res.data?.label,
                        revenueDataList: res.data?.data,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
}

export const create_report = (data, setLoading, setStep) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.post(`/reports/`, data)
                .then((res) => {
                    console.log(res.data)
                    setLoading(false);
                    setStep(1)
                    dispatch({
                        type: "SET_CUSTOMER_ACCESS",
                        payload: {
                            customer_data: res.data
                        }
                    })
                    dispatch({
                        type: 'SET_REPORT_ID',
                        payload: res.data.id,
                    })
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
}



export const get_customer_data = (report_id, setLoading) => {
    return async (dispatch) => {
        try {
            setLoading(true);

            await axiosIns.get(`/reports/${report_id}`)
                .then((res) => {
                    console.log("customer data", res.data);
                    setLoading(false);
                    dispatch({
                        type: 'SET_CUSTOMER',
                        payload: res?.data
                    });
                })
                .catch((err) => {
                    console.log(err?.response?.data);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
};



export const create_dga = (data, setLoading, setStep) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.post(`/report-dga/`, data)
                .then((res) => {
                    console.log(res.data)
                    setLoading(false);
                    dispatch({
                        type: "SET_DGA_ACCESS",
                        payload: {
                            dga_data: data
                        }
                    })
                    dispatch({
                        type: 'SET_DGAGAS',
                        payload: {
                            dga_id: res?.data?.entries[0]?.id,
                            gas1: {
                                label: res?.data?.chart?.new_dga?.label,
                                data: res?.data?.chart?.new_dga?.data,
                                date: res?.data?.chart?.new_dga?.date
                            },
                            compare: data?.is_compare,
                            gas2: {
                                label: res?.data?.chart?.old_dga?.label,
                                data: res?.data?.chart?.old_dga?.data,
                                date: res?.data?.chart?.old_dga?.date
                            }
                        }
                    })
                    setStep(3)
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
}

export const get_dga_data = (report_id, dga_id, setLoading, setStep, color) => {
    return async (dispatch) => {
        try {
            setLoading(true);

            const queryParams = report_id != null
                ? { report_id: report_id }
                : { dga_id: dga_id };

            await axiosIns.get(`/report-dga/analyze/`, { params: queryParams })
                .then((res) => {
                    console.log(res.data);
                    setLoading(false);
                    dispatch({
                        type: 'SET_DGA',
                        payload: {
                            dga_data: res.data,
                            graph_color: color
                        }
                    });
                    setStep(4);
                })
                .catch((err) => {
                    console.log(err?.response?.data);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
};

export const create_ost = (data, setLoading, setStep) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.post(`/report-ost/`, data)
                .then((res) => {
                    console.log(res.data)
                    setLoading(false);
                    dispatch({
                        type: "SET_OST_ACCESS",
                        payload: {
                            ost_data: data
                        }
                    })
                    dispatch({
                        type: 'SET_OST_ID',
                        payload: res?.data?.id
                    })
                    setStep(2)
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
}

export const get_ost_data = (report_id, ost_id, setLoading) => {
    return async (dispatch) => {
        try {
            setLoading(true);

            const queryParams = report_id != null
                ? { report_id: report_id }
                : { ost_id: ost_id };

            await axiosIns.get(`/report-ost/analyze/`, { params: queryParams })
                .then((res) => {
                    console.log("data", res.data);
                    setLoading(false);
                    dispatch({
                        type: 'SET_OST',
                        payload: res.data,
                    });
                })
                .catch((err) => {
                    console.log(err?.response?.data);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
};

export const create_furon = (data, setLoading, setStep) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.post(`/report-furonic/`, data)
                .then((res) => {
                    console.log(res.data)
                    setLoading(false);
                    dispatch({
                        type: "SET_FURON_ACCESS",
                        payload: {
                            furon_data: data
                        }
                    })
                    dispatch({
                        type: 'SET_FURON_ID',
                        payload: res?.data?.id
                    })
                    setStep(5)
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
}

export const get_furon_data = (report_id, furon_id, setLoading) => {
    return async (dispatch) => {
        try {
            setLoading(true);

            const queryParams = report_id != null
                ? { report_id: report_id }
                : { furonic_id: furon_id };

            await axiosIns.get(`/report-furonic/analyze/`, { params: queryParams })
                .then((res) => {
                    console.log(res.data);
                    setLoading(false);
                    dispatch({
                        type: 'SET_FURON',
                        payload: res.data,
                    });
                })
                .catch((err) => {
                    console.log(err?.response?.data);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
};

export const get_complete_report = (report_id, setLoading, navigate) => {
    return async (dispatch) => {
        try {
            setLoading(true);
            await axiosIns.get(`/reports/${report_id}/complete-analysis`)
                .then((res) => {
                    console.log("Complete Report Data", res.data);
                    setLoading(false);
                    navigate(`/view-report/${report_id}`, { state: res.data });
                })
                .catch((err) => {
                    console.log(err?.response?.data);
                    toast.error(err?.response?.data?.detail || "Something went wrong!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
}









