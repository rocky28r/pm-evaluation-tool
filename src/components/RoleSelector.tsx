import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRoleExpectations } from "@/lib/pm-skills-data";

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  const roles = Object.keys(getRoleExpectations());

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
      <label className="text-sm font-medium text-muted-foreground">
        Select Role Benchmark:
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full sm:w-[280px] bg-card">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
