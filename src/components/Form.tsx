import { Certification, Education, Experience, FormData } from '@/interfaces/Form';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

const Form: React.FC<{ curriculumData: FormData; onChange: (field: keyof FormData, value: string | string[] | Experience[] | Education[] | Certification[]) => void }> = ({
    curriculumData,
    onChange,
}) => {

    const handleFieldChange = (field: keyof FormData, value:string | string[] | Experience[] | Education[] | Certification[]) => {
        onChange(field, value);
    };

    return (
        <form className="bg-white w-full text-sm h-[50rem] overflow-y-scroll mt-5">
            <label className="block mb-4 font-medium text-base border-b pb-1">Sobre ti</label>
            <div className='flex flex-col gap-2'>
                <InputField
                    value={curriculumData.name}
                    onChange={(value) => handleFieldChange('name', value)}
                    placeholder="Nombre completo"
                    required
                />
                <InputField
                    value={curriculumData.title}
                    onChange={(value) => handleFieldChange('title', value)}
                    placeholder="Título del rol"
                    required
                />
                <TextareaField
                    value={curriculumData.summary}
                    onChange={(value) => handleFieldChange('summary', value)}
                    placeholder="Escribe lo mejor sobre ti"
                    required
                />
            </div>
            <div>
                <DynamicFieldGroup
                    title="Habilidades"
                    value={curriculumData.skills}
                    onChange={(value) => handleFieldChange('skills', value)}
                    InputComponent={SkillInput}
                    defaultValue=""
                />
                <DynamicFieldGroup
                    title="Experiencia"
                    value={curriculumData.experience}
                    onChange={(value) => handleFieldChange('experience', value)}
                    InputComponent={ExperienceInput}
                    defaultValue={{ title: '', startDate: '', endDate: '', description: '' }}
                />
                <DynamicFieldGroup
                    title="Educación"
                    value={curriculumData.education}
                    onChange={(value) => handleFieldChange('education', value)}
                    InputComponent={EducationInput}
                    defaultValue={{ name: '', startDate: '', endDate: '' }}
                />
                <DynamicFieldGroup
                    title="Certificaciones"
                    value={curriculumData.certifications}
                    onChange={(value) => handleFieldChange('certifications', value)}
                    InputComponent={CertificationInput}
                    defaultValue={{ name: '', description: '', link: '' }}
                />
                <DynamicFieldGroup
                    title="Idiomas"
                    value={curriculumData.languages}
                    onChange={(value) => handleFieldChange('languages', value)}
                    InputComponent={LanguageInput}
                    defaultValue=""
                />
                <div className='flex flex-col'>
                    <label className="block font-medium text-base pb-1 mb-1">Escribe tus referencias</label>
                    <TextareaField
                        value={curriculumData.references}
                        onChange={(value) => handleFieldChange('references', value)}
                        placeholder="Escribe tus referencias"
                        required
                    />
                </div>
            </div>
        </form>
    );
};

const DynamicFieldGroup = <T,>({
    title,
    value,
    onChange,
    InputComponent,
    defaultValue,
}: {
    title: string;
    value: T[];
    onChange: (value: T[]) => void;
    InputComponent: React.FC<DynamicInputProps<T>>;
    defaultValue: T;
}) => {
    const handleAdd = () => {
        onChange([...value, defaultValue]);
    };

    const handleDelete = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, newValue: T) => {
        const updatedValues = [...value];
        updatedValues[index] = newValue;
        onChange(updatedValues);
    };

    return (
        <div className="mb-5 flex flex-col gap-1">
            <label className="block font-medium text-base border-b pb-1 mb-1">{title}</label>
            {value.map((item, index) => (
                <InputComponent
                    key={index}
                    value={item}
                    onChange={(newValue) => handleChange(index, newValue)}
                    onDelete={() => handleDelete(index)}
                    isLast={index === value.length - 1}
                />
            ))}
            <div className='w-full flex items-end justify-start'>
                <button type="button" onClick={handleAdd} className="w-fit mt-1 text-customizable flex items-center gap-2 bg-customizable/10 rounded p-2 px-3 duration-200 hover:bg-customizable/5 active:bg-customizable/15">
                    Agregar {title.toLowerCase()} <Plus size={20} />
                </button>
            </div>
        </div>
    );
};

interface DynamicInputProps<T> {
    value: T;
    onChange: (value: T) => void;
    onDelete?: () => void;
    isLast: boolean;
}

const InputField: React.FC<{
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    required?: boolean;
}> = ({ value, onChange, placeholder, required }) => (
    <div className="w-full">
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border p-2 rounded-md w-full outline-none duration-200 hover:border-customizable/30 focus:border-customizable"
            placeholder={placeholder}
            required={required}
        />
    </div>
);

const TextareaField: React.FC<{
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    required?: boolean;
}> = ({ value, onChange, placeholder, required }) => (
    <div className="mb-4">
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border p-2 rounded-md w-full h-20 outline-none duration-200 hover:border-customizable/30 focus:border-customizable"
            placeholder={placeholder}
            required={required}
        />
    </div>
);

const SkillInput: React.FC<DynamicInputProps<string>> = ({ value, onChange, onDelete }) => (
    <div className="flex items-center gap-2">
        <InputField value={value} onChange={onChange} placeholder="Agrega una habilidad" required />
        {onDelete && (
            <button type="button" onClick={onDelete} className=" w-fit text-red-500 flex items-center gap-2 bg-red-50/60 rounded p-2 duration-200 hover:bg-red-50 active:bg-red-100">
                <Minus size={20} />
            </button>
        )}
    </div>
);

const ExperienceInput: React.FC<DynamicInputProps<Experience>> = ({ value, onChange, onDelete }) => {
    const handleChange = (field: keyof Experience, newValue: string) => {
        onChange({ ...value, [field]: newValue });
    };

    return (
        <div className="flex gap-2 items-start">
            <div className='flex flex-col gap-2 w-full'>
                <InputField
                    value={value.title}
                    onChange={(v) => handleChange('title', v)}
                    placeholder="Título"
                    required
                />
                <InputField
                    value={value.startDate}
                    onChange={(v) => handleChange('startDate', v)}
                    placeholder="Fecha de inicio"
                    required
                />
                <InputField
                    value={value.endDate}
                    onChange={(v) => handleChange('endDate', v)}
                    placeholder="Fecha de fin o actualidad"
                    required
                />
                <TextareaField
                    value={value.description}
                    onChange={(v) => handleChange('description', v)}
                    placeholder="Descripción del trabajo"
                    required
                />
            </div>
            {onDelete && (
                <button type="button" onClick={onDelete} className="w-fit text-red-500 flex items-center gap-2 bg-red-50/60 rounded p-2 duration-200 hover:bg-red-50 active:bg-red-100">
                    <Minus size={20} />
                </button>
            )}
        </div>
    );
};

const EducationInput: React.FC<DynamicInputProps<Education>> = ({ value, onChange, onDelete }) => {
    const handleChange = (field: keyof Education, newValue: string) => {
        onChange({ ...value, [field]: newValue });
    };

    return (
        <div className="flex gap-2 items-start">
            <div className='flex flex-col gap-2 w-full'>
                <InputField
                    value={value.name}
                    onChange={(v) => handleChange('name', v)}
                    placeholder="Nombre de la educación"
                    required
                />
                <InputField
                    value={value.startDate}
                    onChange={(v) => handleChange('startDate', v)}
                    placeholder="Fecha de inicio"
                    required
                />
                <InputField
                    value={value.endDate}
                    onChange={(v) => handleChange('endDate', v)}
                    placeholder="Fecha de fin o actualidad"
                    required
                />
            </div>

            {onDelete && (
                <button type="button" onClick={onDelete} className="w-fit text-red-500 flex items-center gap-2 bg-red-50/60 rounded p-2 duration-200 hover:bg-red-50 active:bg-red-100">
                    <Minus size={20} />
                </button>
            )}
        </div>
    );
};


const CertificationInput: React.FC<DynamicInputProps<Certification>> = ({ value, onChange, onDelete }) => {
    const handleChange = (field: keyof Certification, newValue: string) => {
        onChange({ ...value, [field]: newValue });
    };

    return (
        <div className="flex gap-2 items-start">
            <div className='flex flex-col gap-2 w-full'>
                <InputField
                    value={value.name}
                    onChange={(v) => handleChange('name', v)}
                    placeholder="Nombre de la certificación"
                    required
                />
                <TextareaField
                    value={value.description}
                    onChange={(v) => handleChange('description', v)}
                    placeholder="Descripción"
                    required
                />
                <InputField
                    value={value.link}
                    onChange={(v) => handleChange('link', v)}
                    placeholder="Enlace"
                    required
                />
            </div>

            {onDelete && (
                <button type="button" onClick={onDelete} className="w-fit text-red-500 flex items-center gap-2 bg-red-50/60 rounded p-2 duration-200 hover:bg-red-50 active:bg-red-100">
                    <Minus size={20} />
                </button>
            )}
        </div>
    );
};

const LanguageInput: React.FC<DynamicInputProps<string>> = ({ value, onChange, onDelete }) => (
    <div className="flex items-center gap-2">
        <InputField value={value} onChange={onChange} placeholder="Agrega un idioma" required />
        {onDelete && (
            <button type="button" onClick={onDelete} className="w-fit text-red-500 flex items-center gap-2 bg-red-50/60 rounded p-2 duration-200 hover:bg-red-50 active:bg-red-100">
                <Minus size={20} />
            </button>
        )}
    </div>
);

export default Form;
