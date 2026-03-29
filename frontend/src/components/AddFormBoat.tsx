'use client';
import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Input } from '@base-ui/react/input';
import { Button } from '@base-ui/react/button';
import styles from '../css/addform.module.css';
import inputStyles from '../css/input.module.css';
import { useState } from 'react'


export default function AddFormBoat({ isNew }: { isNew: boolean }) {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedBoat, setSelectedBoat] = useState(null);

    async function handleBoatSearchDebounced(keyword: string) {
        setError(null)
        setLoading(true)
        try {
            const url = keyword
                ? `/api/boats/search/debounced?keyword=${encodeURIComponent(keyword)}`
                : `/api/boats/search/debounced`
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
                    <Field.Root name="boat_name" className={styles.Field}>
                        <Field.Label className={styles.Label}>Boat name</Field.Label>
                        <Field.Control
                            type="text"
                            required
                            defaultValue={searchKeyword}
                            placeholder="Search for an existing boat..."
                            className={styles.Input}
                            onChange={(e) => {
                                setSearchKeyword(e.target.value);
                                handleBoatSearchDebounced(searchKeyword);
                            }}
                        />
                        <Field.Error className={styles.Error} />
                    </Field.Root>
                </>
            ) : (
                <>
                    <Field.Root name="boat_name" className={styles.Field}>
                        <Field.Label className={styles.Label}>Boat name</Field.Label>
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
            <Field.Root name="purchase_date" className={styles.Field}>
                <Field.Label className={styles.Label}>Purchase date</Field.Label>
                <Field.Control
                    type="date"
                    required
                    defaultValue={Date.now().toString()}
                    placeholder={Date.now().toString()}
                    className={styles.Input}
                />
                <Field.Error className={styles.Error} />
            </Field.Root>
            <Field.Root name="year_model" className={styles.Field}>
                <Field.Label className={styles.Label}>Year Model</Field.Label>
                <Field.Control
                    type="number"
                    required
                    defaultValue=""
                    placeholder="Year Model"
                    className={styles.Input}
                />
                <Field.Error className={styles.Error} />
            </Field.Root>
        </>
    );
}
