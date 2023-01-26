export default async function addReminder(reminder) {
  const submitRes = await fetch(`/api/add_reminder/`, {
    method: "POST",
    body: JSON.stringify(reminder),
    headers: { "content-Type": "application/json" },
  });

  const data = await submitRes.json();

  const cronRes = await fetch("/api/cron_job", {
    method: "POST",
    body: JSON.stringify(reminder),
    headers: { "content-Type": "application/json" },
  });
  const cronData = await cronRes.json();

  global.alert("Reminder added successfully");

  global.window.location.reload();
}
