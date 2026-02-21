"use client"

import * as React from "react"
import { Plus, Search, Trash2, StickyNote, MoreVertical, Filter, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Memo {
    id: string
    title: string
    content: string
    category: string
    color: string
    createdAt: number
}

const CATEGORIES = ["전체", "업무", "아이디어", "개인", "비밀", "기타"]
const COLORS = [
    "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800",
    "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
    "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800",
    "bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800",
    "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800",
    "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800",
]

export default function MemoPage() {
    const [memos, setMemos] = React.useState<Memo[]>([])
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState("전체")

    const [newTitle, setNewTitle] = React.useState("")
    const [newContent, setNewContent] = React.useState("")
    const [newCategory, setNewCategory] = React.useState("기타")

    // Load from localStorage
    React.useEffect(() => {
        const saved = localStorage.getItem("v0-memos")
        if (saved) {
            try {
                setMemos(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse memos", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to localStorage
    React.useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("v0-memos", JSON.stringify(memos))
        }
    }, [memos, isLoaded])

    const addMemo = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newContent.trim()) return

        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        const memo: Memo = {
            id: crypto.randomUUID(),
            title: newTitle.trim() || "제목 없음",
            content: newContent,
            category: newCategory,
            color: randomColor,
            createdAt: Date.now(),
        }

        setMemos([memo, ...memos])
        setNewTitle("")
        setNewContent("")
        setNewCategory("기타")
    }

    const deleteMemo = (id: string) => {
        setMemos(memos.filter((m) => m.id !== id))
    }

    const filteredMemos = memos.filter((m) => {
        const matchesSearch =
            m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.content.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "전체" || m.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    if (!isLoaded) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Background Decor */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,var(--primary-foreground),transparent_25%),radial-gradient(circle_at_bottom_left,var(--secondary),transparent_25%)] opacity-30" />

            <main className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
                {/* Header */}
                <div className="flex flex-col items-center gap-6 mb-16 text-center relative">
                    <div className="absolute top-0 right-0">
                        <ThemeToggle />
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-1 rounded-full bg-primary/20 blur-lg" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl">
                            <StickyNote className="h-8 w-8" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-nanum">
                            나의 메모 상자
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-md mx-auto">
                            당신의 생각, 아이디어, 할 일들을 한 곳에 아름답게 기록하세요.
                        </p>
                    </div>
                </div>

                {/* Input Form */}
                <Card className="mb-12 border-muted/40 shadow-xl backdrop-blur-sm bg-card/50">
                    <CardHeader>
                        <CardTitle>새 메모 작성</CardTitle>
                    </CardHeader>
                    <form onSubmit={addMemo}>
                        <CardContent className="space-y-4">
                            <Input
                                placeholder="제목 (선택 사항)"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="bg-background/50"
                            />
                            <Textarea
                                placeholder="무슨 생각을 하고 계신가요?"
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                className="min-h-[120px] bg-background/50 resize-none"
                            />
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.slice(1).map((cat) => (
                                    <Badge
                                        key={cat}
                                        variant={newCategory === cat ? "default" : "outline"}
                                        className="cursor-pointer px-3 py-1 text-sm transition-all"
                                        onClick={() => setNewCategory(cat)}
                                    >
                                        {cat}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground italic">
                                + 버튼이나 작성을 클릭하여 저장하세요
                            </p>
                            <Button type="submit" size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                메모 작성
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="메모 검색하기..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-11 bg-card/30 backdrop-blur-sm border-muted/30 rounded-xl"
                        />
                    </div>

                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-11 px-4 gap-2 rounded-xl bg-card/30 border-muted/30">
                                    <Filter className="h-4 w-4" />
                                    {selectedCategory}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {CATEGORIES.map((cat) => (
                                    <DropdownMenuItem
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(selectedCategory === cat && "bg-muted font-medium")}
                                    >
                                        {cat}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Memos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMemos.length > 0 ? (
                        filteredMemos.map((memo) => (
                            <Card
                                key={memo.id}
                                className={cn(
                                    "group relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg border-2",
                                    memo.color
                                )}
                            >
                                <CardHeader className="pb-3 px-6 pt-6">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="secondary" className="bg-background/40 hover:bg-background/60 text-[10px] uppercase tracking-wider">
                                            {memo.category}
                                        </Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-32">
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => deleteMemo(memo.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    삭제
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <CardTitle className="text-xl mt-2 line-clamp-1">{memo.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 pb-6 pt-0">
                                    <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap line-clamp-6">
                                        {memo.content}
                                    </p>
                                </CardContent>
                                <CardFooter className="px-6 py-4 bg-background/20 border-t border-muted/10 items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground uppercase font-medium">
                                        {format(memo.createdAt, "yyyy년 MM월 dd일")}
                                    </span>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center">
                            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/30 mb-6">
                                <StickyNote className="h-10 w-10 text-muted-foreground/40" />
                            </div>
                            <h3 className="text-xl font-semibold text-muted-foreground">
                                {searchQuery ? "검색 결과가 없습니다" : "메모가 아직 없습니다"}
                            </h3>
                            <p className="text-muted-foreground mt-2">
                                {searchQuery ? "다른 검색어를 입력해 보세요" : "위에서 첫 번째 메모를 추가해 보세요!"}
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
