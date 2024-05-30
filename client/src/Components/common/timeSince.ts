// Convert Date to Text Format

export function timeSince(date : Date) {
    const now : number | any = new Date();
    const postDate : number | any = new Date(date);
    const seconds  = Math.floor((now - postDate) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval === 1 ? ' a year ago' : ` ${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval === 1 ? ' a month ago' : ` ${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval === 1 ? ' a day ago' : ` ${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? ' an hour ago' : ` ${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval === 1 ? ' a minute ago' : ` ${interval} minutes ago`;
    }
    return ' just now';
}