CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`role` text,
	`email` text,
	`password` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
