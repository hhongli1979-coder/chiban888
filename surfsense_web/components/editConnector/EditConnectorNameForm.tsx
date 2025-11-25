"use client";

import type { Control, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Assuming EditConnectorFormValues is defined elsewhere or passed as generic
interface EditConnectorNameFormProps<T extends FieldValues = FieldValues> {
	control: Control<T>;
}

export function EditConnectorNameForm<T extends FieldValues = FieldValues>({ control }: EditConnectorNameFormProps<T>) {
	return (
		<FormField
			control={control}
			name="name"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Connector Name</FormLabel>
					<FormControl>
						<Input {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
