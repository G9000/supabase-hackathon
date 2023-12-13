CREATE UNIQUE INDEX diet_preferences_user_id_key ON public.diet_preferences USING btree (user_id);

alter table "public"."diet_preferences" add constraint "diet_preferences_user_id_key" UNIQUE using index "diet_preferences_user_id_key";


