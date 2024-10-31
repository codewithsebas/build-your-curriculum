import { FileText, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';

interface CurriculumData {
    name: string;
    title: string;
    summary: string;
    skills: string[];
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
    languages: string[];
    references: string;
    profilePicture: string;
}

interface Experience {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Education {
    name: string;
    startDate: string;
    endDate: string;
}

interface Certification {
    name: string;
    description: string;
    link: string;
}

interface TemplateDevProps {
    onChange: (field: keyof CurriculumData, value: string | string[], index?: number) => void;
    curriculumData: CurriculumData;
}

const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
};

const TemplateDev: React.FC<TemplateDevProps> = ({
    curriculumData,
    onChange
}) => {
    const { role:roleLocal, name: nameLocal } = useGlobalStore();
    const { name, summary, skills, experience, education, certifications, languages, references, profilePicture } = curriculumData;
    const templateRef = useRef<HTMLDivElement>(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const handleFileChange = (field: 'profilePicture', event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(field, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        if (templateRef.current) {
            const html2pdf = (await import('html2pdf.js')).default;
            html2pdf().set({
                margin: 10,
                filename: `${nameLocal}-Curriculum.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
            }).from(templateRef.current).save(`${nameLocal}-Curriculum.pdf`).finally(() => {
                setIsGeneratingPDF(false);
            });
        }
    };



    return (
        <div className="w-full h-full lg:w-3/5 lg:max-h-fit p-4 ps-1 break-words lg:h-[56rem] lg:overflow-y-auto lg:overflow-x-hidden border-t lg:border-none">
            <div ref={templateRef}>
                <div className='flex items-center w-full gap-5 p-2 pb-5'>
                    <label htmlFor="profilePicture" className='w-24 h-24 max-w-24 max-h-24 flex items-center justify-center cursor-pointer border-2 bg-slate-50 border-white rounded-full shadow-md'>
                        {profilePicture ? (
                            <div className='relative'>
                                <Image
                                    src={profilePicture}
                                    alt={`${name}'s profile`}
                                    width={100}
                                    height={100}
                                    className='w-full h-full object-cover rounded-full'
                                />
                                <div className={`w-8 h-8 bg-white rounded-full absolute z-0 -top-2 border border-slate-50 -right-2 flex items-center justify-center shadow ${isGeneratingPDF ? 'hidden' : ''}`}>
                                    <ImagePlus size={15} className='text-slate-400' />
                                </div>
                            </div>
                        ) : (
                            <ImagePlus size={30} className='text-slate-400' />
                        )}
                        <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            onChange={(e) => handleFileChange('profilePicture', e)}
                            className="border p-2 w-full rounded"
                            hidden
                        />
                    </label>

                    <div className='text-black/80 flex flex-col justify-center'>
                        <h2 className="text-3xl font-semibold">{nameLocal}</h2>
                        <h4 className="text-xl font-medium text-black/40">{roleLocal}</h4>
                    </div>
                </div>
                <div className='w-full h-full relative'>
                    <div className='w-60 h-60 bg-customizable rotate-45 absolute -top-72 -right-40 hidden lg:block'></div>
                    <div className='w-full pb-5'>

                        <div className='flex flex-col gap-3 px-3'>

                            {summary ? (
                                <div className="mt-2">
                                    <h5 className="font-semibold text-xl">Sobre mí:</h5>
                                    <p>{formatText(summary)}</p>
                                </div>
                            ) : (
                                <span className='flex rounded-lg w-full bg-slate-50 h-36 text-slate-500'></span>
                            )}

                            <div className='flex items-start justify-between gap-3 mt-2'>
                                {experience.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        <h5 className="font-semibold text-xl">Experiencia</h5>
                                        <ul className="list-none flex flex-col gap-4">
                                            {experience.map((job, index) => (
                                                <li key={index}>
                                                    <div className='flex items-center gap-2 mb-2 flex-wrap'>
                                                        <h4 className='font-medium text-lg'>{job.title}</h4>
                                                        ({job.startDate} - {job.endDate})
                                                    </div>
                                                    <span>{formatText(job.description)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-2 w-full'>
                                        <span className='flex rounded-lg w-full bg-slate-50 h-20 text-slate-500'></span>
                                        <span className='flex rounded-lg w-full bg-slate-50 h-16 text-slate-500'></span>
                                        <span className='flex rounded-lg w-full bg-slate-50 h-24 text-slate-500'></span>
                                        <span className='flex rounded-lg w-full bg-slate-50 h-28 text-slate-500'></span>
                                    </div>
                                )}

                                <div className='flex flex-col gap-3 min-w-36 w-full max-w-48'>
                                    {skills.length > 1 ? (
                                        <div className="flex flex-col gap-2">
                                            <h5 className="font-semibold text-xl">Habilidades</h5>
                                            <ul className="list-none pb-1">
                                                {skills.map((skill, index) => (
                                                    <li key={index}>
                                                        <p>{skill}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className='flex flex-col gap-2'>
                                            <span className='flex rounded-lg w-100 bg-slate-50 h-10 text-slate-500'></span>
                                            <span className='flex rounded-lg w-100 bg-slate-50 h-10 text-slate-500'></span>
                                            <span className='flex rounded-lg w-100 bg-slate-50 h-10 text-slate-500'></span>
                                            <span className='flex rounded-lg w-100 bg-slate-50 h-10 text-slate-500'></span>
                                            <span className='flex rounded-lg w-100 bg-slate-50 h-10 text-slate-500'></span>
                                            <span className='flex rounded-lg w-100 bg-slate-50 h-10 text-slate-500'></span>
                                        </div>
                                    )}

                                    {languages.length > 1 ? (
                                        <div className="flex flex-col gap-2">
                                            <h5 className="font-semibold text-xl">Idiomas</h5>
                                            <ul className="list-disc list-inside">
                                                {languages.map((language, index) => (
                                                    <li key={index}>{language}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className='flex flex-col gap-2'>
                                            <span className='flex rounded-lg w-100 bg-slate-50 h-10 text-slate-500'></span>
                                            <span className='flex rounded-lg w-100 bg-slate-50 h-10 text-slate-500'></span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {education.length > 0 ? (
                                <div className="flex flex-col gap-2 mt-2">
                                    <h5 className="font-semibold text-xl">Educación</h5>
                                    <ul className="list-none flex flex-col gap-3">
                                        {education.map((edu, index) => (
                                            <li key={index} className='flex items-center gap-2 flex-wrap'>
                                                <h4 className='font-medium text-lg'>{edu.name}</h4> ({edu.startDate} - {edu.endDate})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (<div className='flex flex-col gap-2'>
                                <span className='flex rounded-lg w-full bg-slate-50 h-20 text-slate-500'></span>
                                <span className='flex rounded-lg w-full bg-slate-50 h-16 text-slate-500'></span>
                                <span className='flex rounded-lg w-full bg-slate-50 h-24 text-slate-500'></span>
                            </div>)}

                            {certifications.length > 0 ? (
                                <div className="flex flex-col gap-2 mt-2">
                                    <h5 className="font-semibold text-xl">Certificaciones</h5>
                                    <ul className="list-none flex flex-col gap-3">
                                        {certifications.map((certification, index) => (
                                            <li key={index}>
                                                <h4 className='font-medium text-lg'>{certification.name}</h4> {formatText(certification.description)} - <a href={certification.link} className='underline text-blue-400' target="_blank" rel="noopener noreferrer">{certification.link}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-2'>
                                    <span className='flex rounded-lg w-full bg-slate-50 h-20 text-slate-500'></span>
                                    <span className='flex rounded-lg w-full bg-slate-50 h-16 text-slate-500'></span>
                                    <span className='flex rounded-lg w-full bg-slate-50 h-24 text-slate-500'></span>
                                </div>
                            )}



                            {references.length > 0 ? (
                                <div className="flex flex-col mt-2">
                                    <h5 className="font-semibold text-xl">Referencias</h5>
                                    <p>{formatText(references)}</p>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-2'>
                                    <span className='flex rounded-lg w-full bg-slate-50 h-40 text-slate-500'></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 bg-customizable fixed bottom-5 right-5 text-white rounded-md duration-200 hover:bg-customizable/90">
                Descargar <FileText size={18} />
            </button>
        </div>
    );
};

export default TemplateDev;
