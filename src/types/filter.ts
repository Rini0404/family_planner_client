export enum SelectedMember {
    ME = 'Me',
    EVERYONE = 'Everyone'
}

export enum DateChosen {
    TODAY = 'Today',
    CUSTOM = 'Custom'
}

export type FilterOptions = {
    member: string | SelectedMember.EVERYONE
    date: Date | null
    status: string
}
