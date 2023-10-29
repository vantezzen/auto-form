import * as z from 'zod';
import React, { useState } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../../form';
import { RadioGroup, RadioGroupItem } from '../../radio-group';
import { Input } from '../../input';
import { AutoFormInputComponentProps } from '../types';
import AutoFormRadioGroup from './radio-group';

export default function AutoFormRadioInput({
    label,
    isRequired,
    field,
    zodItem,
    fieldProps,
}: AutoFormInputComponentProps) {
  const values = (zodItem as unknown as z.ZodEnum<any>)._def.values;
  const [unit, setUnit] = useState('sqft');
  const [value, setValue] = useState(0);
  const units = ['sqft', 'gaz']
  const handleUnitChange = (newValue: string) => {
    setUnit(newValue);
  };

  return (
    <FormItem className="space-y-3">
      <FormLabel>
        {label}
        {isRequired && <span className="text-destructive"> *</span>}
      </FormLabel>
      <FormControl>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </FormControl>
      <FormControl>
        <RadioGroup
            onValueChange={handleUnitChange}
            defaultValue={unit}
            className="flex flex-col space-y-1"
            {...fieldProps}
            >
            {units.map((value: any) => (
                <FormItem
                className="flex items-center space-x-3 space-y-0"
                key={value}
                >
                <FormControl>
                    <RadioGroupItem value={value} />
                </FormControl>
                <FormLabel className="font-normal">{value}</FormLabel>
                </FormItem>
            ))}
            </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
