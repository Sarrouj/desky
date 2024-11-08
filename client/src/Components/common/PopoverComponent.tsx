import * as React from "react";

// ShadCn UI
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

interface data {
  value: string;
  label: string;
}

export interface PopoverProps {
  data: data[];
  type: string;
  value: string;
  setValue: any;
  search: string;
  notFound: string;
}

const PopoverCom: React.FC<PopoverProps> = ({
  data,
  type,
  value,
  setValue,
  search,
  notFound,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" w-1/2 md:w-[200px]
            lg:w-[250px] xl:w-[300px] h-[35px] md:h-[32px] xl:h-[35px]
            justify-between border-2
            text-xs md:text-xs lg:text-sm xl:text-md truncate"
        >
          {value ? data.find((d) => d.value === value)?.label : type}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[250px] md:w-[250px] 
            lg:w-[300px] xl:w-[300px] "
      >
        <Command>
          <CommandInput
            placeholder={search}
            className="text-xs md:text-xs lg:text-sm xl:text-md"
          />
          <CommandEmpty className="text-xs md:text-xs lg:text-sm xl:text-md">
            {notFound}
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {data.map((d, index) => (
                <CommandItem
                  key={index}
                  value={d.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="text-xs md:text-xs lg:text-sm xl:text-md"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === d.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {d.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCom;
