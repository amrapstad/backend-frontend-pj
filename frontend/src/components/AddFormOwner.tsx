'use client';
import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Input } from '@base-ui/react/input';
import { Button } from '@base-ui/react/button';
import styles from '../css/addform.module.css';
import inputStyles from '../css/input.module.css';
import { useState } from 'react'


export default function AddFormOwner({ isNew }: { isNew: boolean }) {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedBoat, setSelectedBoat] = useState(null);

    async function handleOwnerSearchDebounced(keyword: string) {
        setError(null)
        setLoading(true)
        try {
            const url = keyword
                ? `/api/owners/search/debounced?keyword=${encodeURIComponent(keyword)}`
                : `/api/owners/search/debounced`
            const res = await fetch(url)
            if (!res.ok) { setError(await res.text()); setItems([]); return }
            setItems(await res.json())
        } catch { setError('Something went wrong.') }
        finally { setLoading(false) }
    }

    return (
        <>
            {isNew ? (
                <>
                    <Field.Root name="owner_name" className={styles.Field}>
                        <Field.Label className={styles.Label}>Owner name</Field.Label>
                        <Field.Control
                            type="text"
                            required
                            defaultValue={searchKeyword}
                            placeholder="Search for an existing boat..."
                            className={styles.Input}
                            onChange={(e) => {
                                setSearchKeyword(e.target.value);
                                handleOwnerSearchDebounced(searchKeyword);
                            }}
                        />
                        <Field.Error className={styles.Error} />
                    </Field.Root>
                </>
            ) : (
                <>
                    <Field.Root name="owner_name" className={styles.Field}>
                        <Field.Label className={styles.Label}>Owner name</Field.Label>
                        <Field.Control
                            type="text"
                            required
                            defaultValue=""
                            placeholder="Boat name"
                            className={styles.Input}
                        />
                        <Field.Error className={styles.Error} />
                    </Field.Root>
                </>
            )}
            <Field.Root name="email" className={styles.Field}>
                <Field.Label className={styles.Label}>Email</Field.Label>
                <Field.Control
                    type="text"
                    required
                    defaultValue=""
                    placeholder="Email"
                    className={styles.Input}
                />
                <Field.Error className={styles.Error} />
            </Field.Root>
        </>
    );
}
