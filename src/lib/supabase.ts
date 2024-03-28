import { createClient } from "@supabase/supabase-js";

// const url = import.meta.env.VITE_SUPABASE_URL;
// const key = import.meta.env.VITE_SUPABASE_KEY;
const url = "https://lcbpilugzwhrvoitkiym.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYnBpbHVnendocnZvaXRraXltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTQ0MzgzOSwiZXhwIjoyMDI3MDE5ODM5fQ.XQUzuKWGzSIUQm9ZawcFkjCE5OORAt_tcAeOV3IKbkc";

export const supabase = createClient(url, key);
