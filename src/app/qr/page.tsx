"use client"

import { useEffect, useRef, useState } from "react";
import StudentSideBar from "../comps/studentSidebar";
import { API_ENDPOINTS } from "../api";
import axios from "axios";
import LoadingPage from "../comps/LoadingPage";
import { withAuth } from "../protection";
import QRCode from "react-qr-code";




const QR = () => {
    const [userName, setUserName] = useState("");
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const userid = window.localStorage.getItem('userid');

        const fetchUserById = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GET_USER_BY_ID + userid);
                setUserName(response.data.username)
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setPageLoading(false);
            }
        };

        fetchUserById();
    }, []);

    const qrRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        if (qrRef.current) {
            const svg = qrRef.current.querySelector('svg');
            if (svg) {
                const svgData = new XMLSerializer().serializeToString(svg);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    const img = new Image();
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        const url = canvas.toDataURL('image/png');
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'EventEaseQRCode.png';
                        link.click();
                    };
                    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                } else {
                    console.error('Failed to get 2D context');
                }
            }
        }
    };

    if (pageLoading) {
        return <LoadingPage />;
    }
    return (
        <div className="max-w-[125rem] h-full">
        <div className='w-48'>
            <StudentSideBar isOpen={true} />
        </div>
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <img className="w-[31.25rem] -mb-[5rem] p-0" src="inno.png" />
            <div className="rounded w-[31.25rem] rounded-2xl border-2 border-black">
                <div className="rounded-t-2xl bg-customYellow font-medium flex justify-center items-center text-4xl font-bebas p-1">DOWNLOAD QR CODE</div>
                <div ref={qrRef} className="flex items-center justify-center py-7">
                    <QRCode size={300} bgColor="white" fgColor="black" value={userName} />
                </div>
                <div>
                    <img src="download.png" alt="Download" onClick={handleDownload} className="cursor-pointer" />
                </div>
            </div>
        </div>
    </div>
    )
}

export default withAuth(QR);