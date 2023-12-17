drop policy "Enable all action for users based on user_id" on "public"."grocery";

drop policy "Enable all action for users based on user_id" on "public"."diet_preferences";

revoke delete on table "public"."grocery" from "anon";

revoke insert on table "public"."grocery" from "anon";

revoke references on table "public"."grocery" from "anon";

revoke select on table "public"."grocery" from "anon";

revoke trigger on table "public"."grocery" from "anon";

revoke truncate on table "public"."grocery" from "anon";

revoke update on table "public"."grocery" from "anon";

revoke delete on table "public"."grocery" from "authenticated";

revoke insert on table "public"."grocery" from "authenticated";

revoke references on table "public"."grocery" from "authenticated";

revoke select on table "public"."grocery" from "authenticated";

revoke trigger on table "public"."grocery" from "authenticated";

revoke truncate on table "public"."grocery" from "authenticated";

revoke update on table "public"."grocery" from "authenticated";

revoke delete on table "public"."grocery" from "service_role";

revoke insert on table "public"."grocery" from "service_role";

revoke references on table "public"."grocery" from "service_role";

revoke select on table "public"."grocery" from "service_role";

revoke trigger on table "public"."grocery" from "service_role";

revoke truncate on table "public"."grocery" from "service_role";

revoke update on table "public"."grocery" from "service_role";

revoke delete on table "public"."grocery_item" from "anon";

revoke insert on table "public"."grocery_item" from "anon";

revoke references on table "public"."grocery_item" from "anon";

revoke select on table "public"."grocery_item" from "anon";

revoke trigger on table "public"."grocery_item" from "anon";

revoke truncate on table "public"."grocery_item" from "anon";

revoke update on table "public"."grocery_item" from "anon";

revoke delete on table "public"."grocery_item" from "authenticated";

revoke insert on table "public"."grocery_item" from "authenticated";

revoke references on table "public"."grocery_item" from "authenticated";

revoke select on table "public"."grocery_item" from "authenticated";

revoke trigger on table "public"."grocery_item" from "authenticated";

revoke truncate on table "public"."grocery_item" from "authenticated";

revoke update on table "public"."grocery_item" from "authenticated";

revoke delete on table "public"."grocery_item" from "service_role";

revoke insert on table "public"."grocery_item" from "service_role";

revoke references on table "public"."grocery_item" from "service_role";

revoke select on table "public"."grocery_item" from "service_role";

revoke trigger on table "public"."grocery_item" from "service_role";

revoke truncate on table "public"."grocery_item" from "service_role";

revoke update on table "public"."grocery_item" from "service_role";

revoke delete on table "public"."grocery_list" from "anon";

revoke insert on table "public"."grocery_list" from "anon";

revoke references on table "public"."grocery_list" from "anon";

revoke select on table "public"."grocery_list" from "anon";

revoke trigger on table "public"."grocery_list" from "anon";

revoke truncate on table "public"."grocery_list" from "anon";

revoke update on table "public"."grocery_list" from "anon";

revoke delete on table "public"."grocery_list" from "authenticated";

revoke insert on table "public"."grocery_list" from "authenticated";

revoke references on table "public"."grocery_list" from "authenticated";

revoke select on table "public"."grocery_list" from "authenticated";

revoke trigger on table "public"."grocery_list" from "authenticated";

revoke truncate on table "public"."grocery_list" from "authenticated";

revoke update on table "public"."grocery_list" from "authenticated";

revoke delete on table "public"."grocery_list" from "service_role";

revoke insert on table "public"."grocery_list" from "service_role";

revoke references on table "public"."grocery_list" from "service_role";

revoke select on table "public"."grocery_list" from "service_role";

revoke trigger on table "public"."grocery_list" from "service_role";

revoke truncate on table "public"."grocery_list" from "service_role";

revoke update on table "public"."grocery_list" from "service_role";

alter table "public"."grocery" drop constraint "grocery_user_id_fkey";

alter table "public"."grocery_item" drop constraint "grocery_item_grocery_list_id_fkey";

alter table "public"."grocery_list" drop constraint "grocery_list_grocery_id_fkey";

alter table "public"."diet_preferences" drop constraint "diet_preferences_user_id_fkey";

alter table "public"."grocery" drop constraint "grocery_pkey";

alter table "public"."grocery_item" drop constraint "grocery_item_pkey";

alter table "public"."grocery_list" drop constraint "grocery_list_pkey";

drop index if exists "public"."grocery_item_pkey";

drop index if exists "public"."grocery_list_pkey";

drop index if exists "public"."grocery_pkey";

drop table "public"."grocery";

drop table "public"."grocery_item";

drop table "public"."grocery_list";

alter table "public"."diet_preferences" drop column "allergy";

alter table "public"."diet_preferences" drop column "cuisine_preference";

alter table "public"."diet_preferences" drop column "dietary_requirements";

alter table "public"."diet_preferences" add column "allergies" character varying[];

alter table "public"."diet_preferences" add column "cuisine_preferences" character varying[];

alter table "public"."diet_preferences" add column "dietary_preferences" character varying[];

alter table "public"."diet_preferences" alter column "user_id" set default auth.uid();

alter table "public"."diet_preferences" add constraint "diet_preferences_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."diet_preferences" validate constraint "diet_preferences_user_id_fkey";

create policy "Enable all action for users based on user_id"
on "public"."diet_preferences"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



