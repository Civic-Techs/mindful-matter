export const basicFetchOptions = {
    method: 'GET',
    credentials: 'include',
};

export const deleteOptions = {
    method: 'DELETE',
    credentials: 'include',
};

export const getPostOptions = (body) => ({
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

export const getPatchOptions = (body) => ({
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
});

export const readableDate = (timestamp) => {
    const date = new Date(timestamp)
    const options = {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }

    return date.toLocaleString('en-US', options)

}
