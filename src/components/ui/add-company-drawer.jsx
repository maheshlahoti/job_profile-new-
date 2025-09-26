import React, { useEffect } from 'react';
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent
} from './drawer';
import { Button } from './button';
import { Input } from './input';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";

// Zod schema for proper file validation
const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine((files) => files && files.length > 0, { message: "Logo is required" })
    .refine(
      (files) =>
        !files || (files[0]?.type === "image/png" || files[0]?.type === "image/jpeg"),
      { message: "Only PNG or JPEG images are allowed" }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    // Defensive
    if (!data.name || !data.logo?.length) return;
    fnAddCompany({
      name: data.name,
      logo: data.logo[0], // FileList[0]
    });
  };

  // Only refetch/reset if new company was actually added
  useEffect(() => {
    if (dataAddCompany && Object.keys(dataAddCompany).length > 0) {
      fetchCompanies();
      reset();
    }
  }, [dataAddCompany, fetchCompanies, reset]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button type="button" size="sm" variant="secondary">
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New Company</DrawerTitle>
        </DrawerHeader>
        <div className="flex gap-2 p-4 pb-0">
          {/* Company Name with register */}
          <Input
            placeholder="Company name"
            {...register("name")}
            autoComplete="off"
          />

          {/* File input using Controller for proper binding */}
          <Controller
            name="logo"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="file:text-gray-500"
                onChange={e => field.onChange(e.target.files)}
                ref={field.ref}
              />
            )}
          />

          {/* Add Button */}
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            variant="destructive"
            className="w-40"
          >
            Add
          </Button>
        </div>
        <DrawerFooter>
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
          {errors.logo && (
            <p className="text-red-500">{errors.logo.message}</p>
          )}
          {errorAddCompany?.message && (
            <p className="text-red-500">{errorAddCompany?.message}</p>
          )}
          {loadingAddCompany && (
            <BarLoader width={"100%"} color="#36d7b7" />
          )}
          <DrawerClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
