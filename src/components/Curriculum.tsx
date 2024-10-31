"use client";
import TemplateDev from '@/app/templates/TemplateDev';
import React, { useState, useEffect } from 'react';
import Form from './Form';
import Header from './Header';
import useSession from '@/hooks/useSession';
import { Certification, CurriculumData, Education, Experience } from '@/interfaces/Curriculum';

const Curriculum: React.FC = () => {
    const { session } = useSession();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const [curriculumData, setCurriculumData] = useState<CurriculumData>(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem('curriculumData');
            return savedData
                ? JSON.parse(savedData)
                : {
                    name: '',
                    title: '',
                    summary: '',
                    skills: [''],
                    experience: [],
                    education: [],
                    certifications: [],
                    languages: [''],
                    references: '',
                    profilePicture: ''
                };
        } else {
            return {
                name: '',
                title: '',
                summary: '',
                skills: [''],
                experience: [],
                education: [],
                certifications: [],
                languages: [''],
                references: '',
                profilePicture: ''
            };
        }
    });

    useEffect(() => {
        if (session && isClient) {
            setCurriculumData((prevData) => ({
                ...prevData,
                name: prevData.name || session.user?.user_metadata?.full_name || '',
            }));
        }
    }, [session, isClient]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userRole = localStorage.getItem('userRole');
            if (userRole) {
                setCurriculumData((prevData) => ({
                    ...prevData,
                    title: prevData.title || userRole,
                }));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('curriculumData', JSON.stringify(curriculumData));
        }
    }, [curriculumData]);

    const handleChange = (field: keyof CurriculumData, value: string | string[] | Experience[] | Education[] | Certification[]) => {
        setCurriculumData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-5 w-full lg:min-h-screen bg-slate-100">
            <div className="max-w-7xl h-full w-full flex flex-col gap-3 bg-white border border-slate-200 lg:rounded-xl shadow-sm lg:max-h-screen lg:overflow-hidden lg:flex-row">
                <div className="w-full lg:w-2/5 flex flex-col p-6 border-e">
                    <Header />
                    <Form curriculumData={curriculumData} onChange={handleChange} />
                </div>
                <TemplateDev
                    curriculumData={curriculumData}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Curriculum;
