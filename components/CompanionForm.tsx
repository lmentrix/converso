"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {subjects} from "@/constants";
import {Textarea} from "@/components/ui/textarea";
import {createCompanion} from "@/lib/actions/companion.actions";
import {redirect} from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1,{message:'companion is required'}),
    subject: z.string().min(1,{message:'subject is required'}),

    topic: z.string().min(1,{message:'topic is required'}),

    voice: z.string().min(1,{message:'voice is required'}),

    style: z.string().min(1,{message:'style is required'}),

    duration: z.coerce.number().min(1,{message:'duration is required'}),

})

const CompanionForm = () => {
    type formValues = z.infer<typeof formSchema>;

    // 1. Define your form.
    const form = useForm<formValues>({
        defaultValues: {
            name:'',
            subject:'',
            topic:'',
            voice:'',
            style:'',
            duration:15,
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: formValues) => {

        const companion = await  createCompanion(values)

        if(companion){
            redirect(`/companions/${companion.id}`)
        }else{
            console.log("failed to create a companion")
            redirect('/')
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter companion name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name of your AI companion.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                value={subject}
                                                key={subject}
                                                className={"capitalize"}>
                                                {subject}
                                            </SelectItem>


                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                The subject area for this companion.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>what should the companion help with</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g., Algebra, Biology" {...field} />
                            </FormControl>
                            <FormDescription>
                                The specific topic this companion will focus on.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>voice</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select the voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"male"}>
                                            Male
                                        </SelectItem>
                                        <SelectItem value={"female"}>
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                The subject area for this companion.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select the voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"male"}>
                                            Formal
                                        </SelectItem>
                                        <SelectItem value={"female"}>
                                            Casual
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                The subject area for this companion.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>estimated session duration in minute</FormLabel>
                            <FormControl>
                                <Input
                                    type={"number"}
                                    placeholder={"15"}
                                    {...field}
                                    className={"input"}
                                >

                                </Input>
                            </FormControl>
                            <FormDescription>
                                The subject area for this companion.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className={"w-full cursor-pointer"}>Create Companion</Button>
            </form>
        </Form>
    )
}
export default CompanionForm
